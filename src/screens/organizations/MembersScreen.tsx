import { FC, useEffect, useState } from 'react';
import { useWorkspace } from '@intractinc/base/contexts/WorkspaceContext';
import { useTools } from '@intractinc/base/contexts/ToolsContext';
import OrganizationTierChip from '@intractinc/base/components/Organizations/OrganizationTierChip';
import ErrorScreen from '@/screens/error/ErrorScreen';
import Holding from '@intractinc/base/layout/Holding';
import { makeStyles } from 'tss-react/mui';
import AddOrganizationMember from '@intractinc/base/components/Organizations/Members/AddOrganizationMember';
import { useGetOrganizationMembersMutation } from '@intractinc/base/redux/features/organizationMember';
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
import OrganizationMemberRow from '@intractinc/base/components/Organizations/Members/OrganizationMemberRow';

const MembersScreen: FC = () => {
    const { organization, organizationErrorMsg, organizationSocket } = useWorkspace();
    const currentMember = organization?.member;
    const { updateBreadcrumbs, updateTabTitle } = useTools();
    const { classes } = useStyles();
    const [getMembers, getMembersState] = useGetOrganizationMembersMutation();
    const [members, setMembers] = useState<OrganizationMember[] | null>(null);
    const [expanded, setExpanded] = useState<string | null>(null);
    const addTeamAdminContext = !!(
        organization &&
        organization.supports_teams &&
        organization.member?.organizationGates.admin
    );

    const { nav, queryOptions } = useMeta(getMembers, getMembersState, {
        skip: !organization,
        triggerParams: { orgId: organization?.id ?? 'unknown' },
        useTrashed: false,
        sortName: false,
        include: addTeamAdminContext ? 'projectsCount' : undefined,
    });

    const refetchMembers = () => getMembers({ orgId: organization?.id ?? 'unknown', options: queryOptions });

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
            { name: 'Members' },
        ]);

        if (!organization) {
            return;
        }

        updateTabTitle(`${organization.name} - Members`);
    }, [organization]);

    useEffect(() => {
        getMembersState.data?.data && setMembers(getMembersState.data.data);
    }, [getMembersState]);

    useEffect(() => {
        setMembers(null);
    }, [organization?.id]);

    useEffect(() => {
        if (!organizationSocket || !organization) {
            return;
        }

        organizationSocket
            .listen('.organization.member.added', refetchMembers)
            .listen('.organization.member.updated', refetchMembers)
            .listen('.organization.member.removed', refetchMembers);

        return () => {
            if (organizationSocket) {
                organizationSocket
                    .stopListening('.organization.member.added', refetchMembers)
                    .stopListening('.organization.member.updated', refetchMembers)
                    .stopListening('.organization.member.removed', refetchMembers);
            }
        };
    }, [organizationSocket, organization?.id, queryOptions]);

    if (organizationErrorMsg) {
        return (
            <ErrorScreen
                {...{
                    message: organizationErrorMsg,
                    navigateTo: `/home`,
                }}
            />
        );
    }

    if (!organization) {
        return <Holding />;
    }

    if (
        !currentMember ||
        (organization.supports_teams && !currentMember.organizationGates.admin) ||
        (!organization.supports_teams && !currentMember.organizationGates.viewer)
    ) {
        return (
            <ErrorScreen
                {...{
                    message: 'Invalid permissions.',
                    navigateTo: `/organizations/${organization.id}`,
                }}
            />
        );
    }

    return (
        <div className={classes.root}>
            <div className={classes.leftNav}>
                {currentMember.organizationGates.admin && (
                    <div style={{ width: 750 }}>
                        <AddOrganizationMember {...{ organization, open: true, success: refetchMembers }} />
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
                                {addTeamAdminContext && (
                                    <>
                                        <TableCell>Assigned Projects</TableCell>
                                        <TableCell>Added By</TableCell>
                                    </>
                                )}
                                <TableCell align={'right'}>Role</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {members ? (
                                members.length ? (
                                    members.map((member) => (
                                        <OrganizationMemberRow
                                            key={member.id}
                                            {...{
                                                member,
                                                organization,
                                                addTeamAdminContext,
                                                activeMember: currentMember,
                                                refetch: refetchMembers,
                                                expanded,
                                                setExpanded,
                                            }}
                                        />
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={addTeamAdminContext ? 6 : 4}>
                                            <Typography>No members found.</Typography>
                                        </TableCell>
                                    </TableRow>
                                )
                            ) : (
                                <>
                                    {[...Array(10)].map((_el, i) => (
                                        <TableRow key={i}>
                                            <TableCell colSpan={addTeamAdminContext ? 6 : 4}>
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
        paddingRight: theme.spacing(2),
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
    },
    leftNav: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: theme.spacing(2.125),
    },
}));

export default MembersScreen;
