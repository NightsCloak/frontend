import { FC, useEffect, useMemo, useState } from 'react';
import { useTools } from '@intractinc/base/contexts/ToolsContext';
import OrganizationTierChip from '@intractinc/base/components/Organizations/OrganizationTierChip';
import ErrorScreen from '@/screens/error/ErrorScreen';
import Holding from '@intractinc/base/layout/Holding';
import { makeStyles } from 'tss-react/mui';
import useMeta from '@intractinc/base/hooks/useMeta';
import {
    Grid,
    Paper,
    Skeleton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import { useGetProjectMembersMutation } from '@intractinc/base/redux/features/projectMember';
import PublicChip from '@intractinc/base/layout/navbar/PublicChip';
import AddProjectMember from '@intractinc/base/components/Projects/Members/AddProjectMember';
import ProjectMemberRow from '@intractinc/base/components/Projects/Members/ProjectMemberRow';
import { useWorkspace } from '@intractinc/base/contexts/WorkspaceContext';

const MembersScreen: FC = () => {
    const { organization, organizationErrorMsg, project, projectSocket, workspaceProjectId, projectErrorMsg } =
        useWorkspace();
    const currentMember = project?.member;
    const { updateBreadcrumbs, updateTabTitle } = useTools();
    const { classes } = useStyles();
    const [getMembers, getMembersState] = useGetProjectMembersMutation();
    const [members, setMembers] = useState<ProjectMember[] | null>(null);
    const addAdminContext = useMemo(() => !!(project && project.member?.projectGates.admin), [project]);

    const { nav, queryOptions } = useMeta(getMembers, getMembersState, {
        skip: !project || project.id !== workspaceProjectId,
        triggerParams: project && { projectId: project.id },
        useTrashed: false,
        sortName: false,
    });

    const refetchMembers = () => getMembers({ projectId: project?.id ?? 'unknown', options: queryOptions });

    useEffect(() => {
        updateBreadcrumbs([
            {
                skeleton: !organization,
                type: 'organization',
                name: organization?.name,
                avatar: organization?.avatar_route,
                uri: `/organizations/${organization?.id}`,
                chip: <OrganizationTierChip {...{ organization }} />,
            },
            {
                skeleton: !project,
                type: 'project',
                name: project?.name,
                avatar: project?.avatar_route,
                uri: `/organizations/${organization?.id}/projects/${project?.id}`,
                chip: project?.is_published ? <PublicChip /> : undefined,
            },
            { name: 'Members' },
        ]);

        if (!project) {
            return;
        }

        updateTabTitle(`${project.name} - Members`);
    }, [project]);

    useEffect(() => {
        getMembersState.data?.data && setMembers(getMembersState.data.data);
    }, [getMembersState]);

    useEffect(() => {
        getMembersState.reset();
        setMembers(null);
    }, [workspaceProjectId]);

    useEffect(() => {
        if (!projectSocket || !project || !workspaceProjectId) {
            return;
        }

        projectSocket
            .listen('.project.member.added', refetchMembers)
            .listen('.project.member.updated', refetchMembers)
            .listen('.project.member.removed', refetchMembers);

        return () => {
            if (projectSocket) {
                projectSocket
                    .stopListening('.project.member.added', refetchMembers)
                    .stopListening('.project.member.updated', refetchMembers)
                    .stopListening('.project.member.removed', refetchMembers);
            }
        };
    }, [projectSocket, project?.id, workspaceProjectId, queryOptions]);

    if (projectErrorMsg || organizationErrorMsg) {
        return (
            <ErrorScreen
                {...{
                    message: organizationErrorMsg ?? projectErrorMsg,
                    navigateTo: organizationErrorMsg ? `/home` : `/organizations/${organization?.id}`,
                }}
            />
        );
    }

    if (!project) {
        return <Holding />;
    }

    if (!currentMember || !currentMember.projectGates.viewer) {
        return (
            <ErrorScreen
                navigateTo={`/organizations/${organization?.id}/projects/${project.id}`}
                message={'Invalid permissions.'}
            />
        );
    }

    return (
        <div className={classes.root}>
            <div className={classes.leftNav}>
                {currentMember.projectGates.admin && (
                    <div style={{ width: 750 }}>
                        <AddProjectMember {...{ project, open: true, success: refetchMembers }} />
                    </div>
                )}
                {nav()}
            </div>
            <Grid className={classes.container} container columns={15} alignItems={'top'}>
                <TableContainer component={Paper}>
                    <Table size={'small'} aria-label={'users'}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Joined</TableCell>
                                <TableCell>Organization Role</TableCell>
                                {addAdminContext && <TableCell>Added By</TableCell>}
                                <TableCell align={'right'}>Role</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {members ? (
                                members.length ? (
                                    members.map((member) => (
                                        <ProjectMemberRow
                                            key={member.organization_member_id}
                                            {...{
                                                member,
                                                activeMember: currentMember,
                                                refetch: refetchMembers,
                                                addAdminContext,
                                            }}
                                        />
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={addAdminContext ? 6 : 5}>
                                            <Typography>No members found.</Typography>
                                        </TableCell>
                                    </TableRow>
                                )
                            ) : (
                                <>
                                    {[...Array(10)].map((_el, i) => (
                                        <TableRow key={i}>
                                            <TableCell colSpan={addAdminContext ? 6 : 5}>
                                                <Skeleton
                                                    style={{ flexGrow: 1 }}
                                                    animation={'wave'}
                                                    variant={'rectangular'}
                                                    height={35}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </div>
    );
};

const useStyles = makeStyles()((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
    },
    container: {
        display: 'flex',
        justifyContent: 'start',
        overflowY: 'auto',
        transition: `max-height 300ms ease-in-out`,
        '&::-webkit-scrollbar': {
            width: 8,
        },
        scrollbarWidth: 'thin',
        height: 'auto',
        paddingRight: theme.spacing(2),
    },
    leftNav: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: theme.spacing(2.125),
    },
}));

export default MembersScreen;
