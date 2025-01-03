import { makeStyles } from 'tss-react/mui';
import { FC, useEffect, useState } from 'react';
import { Alert, Card, Grid, Skeleton, Typography } from '@mui/material';
import { useTools } from '@intractinc/base/contexts/ToolsContext';
import { useGetOrganizationProjectsMutation } from '@intractinc/base/redux/features/organization';
import ErrorScreen from '@/screens/error/ErrorScreen';
import Holding from '@intractinc/base/layout/Holding';
import AddProject from '@intractinc/base/components/Projects/AddProject';
import useMeta from '@intractinc/base/hooks/useMeta';
import { AutoDelete } from '@mui/icons-material';
import ProjectCard from '@intractinc/base/components/Projects/ProjectCard';
import PendingOrganizationMemberStatus from '@intractinc/base/components/Organizations/Members/PendingOrganizationMemberStatus';
import OrganizationTierChip from '@intractinc/base/components/Organizations/OrganizationTierChip';
import { useWorkspace } from '@intractinc/base/contexts/WorkspaceContext';
import OrganizationNavigation from '@intractinc/base/components/Organizations/OrganizationNavigation';
import { useEcho } from '@intractinc/base/contexts/EchoContext';

const DashboardScreen: FC = () => {
    const {
        organization,
        isOrganizationPending,
        workspaceId,
        organizationSocket,
        organizationErrorMsg,
        refetchOrganization,
        refetchProjects,
    } = useWorkspace();
    const { classes } = useStyles();
    const [projects, setProjects] = useState<Project[] | null>(null);
    const [getProjects, getProjectsState] = useGetOrganizationProjectsMutation();
    const { updateTools, updateBreadcrumbs, updateTabTitle } = useTools();
    const { privateChannel } = useEcho();

    const { nav, queryOptions, showTrashed } = useMeta(getProjects, getProjectsState, {
        skip: !organization || isOrganizationPending || organization.id !== workspaceId,
        triggerParams: organization && { orgId: organization.id },
        include: 'membersCount,assetsCount,assetCollectionsCount',
    });

    const refetchScreenProjects = () => {
        if (!organization) {
            return;
        }

        getProjects({ orgId: organization.id, options: queryOptions });
    };

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
        ]);

        if (!organization) {
            return;
        }

        updateTabTitle(organization.name);
        if (organization.member && organization.member.organizationGates.editor) {
            updateTools([<AddProject key={'add_project'} {...{ organization, refetchProjects }} />]);
        } else {
            updateTools([]);
        }
    }, [organization]);

    useEffect(() => {
        getProjectsState.data?.data && setProjects(getProjectsState.data.data);
    }, [getProjectsState]);

    useEffect(() => {
        setProjects(null);
        getProjectsState.reset();
    }, [workspaceId]);

    useEffect(() => {
        if (organizationSocket) {
            organizationSocket
                .listen('.project.created', refetchScreenProjects)
                .listen('.project.updated', refetchScreenProjects)
                .listen('.project.archived', refetchScreenProjects);

            return () => {
                organizationSocket
                    .stopListening('.project.created', refetchScreenProjects)
                    .stopListening('.project.updated', refetchScreenProjects)
                    .stopListening('.project.archived', refetchScreenProjects);
            };
        }
    }, [organizationSocket]);

    useEffect(() => {
        if (!privateChannel || !organization || !workspaceId) {
            return;
        }

        const orgMember = (data: { organization: Organization }) => {
            if (data.organization.id !== organization.id) {
                return;
            }

            refetchScreenProjects();
        };

        const projectMember = (data: { project: Project }) => {
            if (data.project.organization_id !== organization.id) {
                return;
            }

            refetchScreenProjects();
        };

        privateChannel
            .listen('.organization.member.added', orgMember)
            .listen('.organization.member.updated', orgMember)
            .listen('.organization.member.removed', orgMember)
            .listen('.project.member.added', projectMember)
            .listen('.project.member.updated', projectMember)
            .listen('.project.member.removed', projectMember);

        return () => {
            if (privateChannel) {
                privateChannel
                    .stopListening('.organization.member.added', orgMember)
                    .stopListening('.organization.member.updated', orgMember)
                    .stopListening('.organization.member.removed', orgMember)
                    .stopListening('.project.member.added', projectMember)
                    .stopListening('.project.member.updated', projectMember)
                    .stopListening('.project.member.removed', projectMember);
            }
        };
    }, [privateChannel, organization?.id, workspaceId]);

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

    if (!organization.member || !organization.member.organizationMember) {
        return (
            <ErrorScreen
                {...{
                    message: 'Invalid permissions.',
                    navigateTo: `/home`,
                }}
            />
        );
    }

    if (isOrganizationPending) {
        return (
            <PendingOrganizationMemberStatus
                {...{
                    organization,
                    member: organization.member.organizationMember,
                    refetch: () => {
                        refetchOrganization();
                        refetchProjects();
                    },
                }}
            />
        );
    }

    return (
        <div className={classes.root}>
            <div className={classes.leftNav}>
                <OrganizationNavigation {...{ organization, refetch: refetchOrganization }} />
                {nav()}
            </div>
            <Grid className={classes.container} container columns={15} alignItems={'top'}>
                {showTrashed && (
                    <Grid item xs={15}>
                        <Alert icon={<AutoDelete />} severity={'warning'} style={{ width: 'auto' }}>
                            <Typography>
                                Projects that have been in trash for more than 7 days will be automatically deleted
                                forever.
                            </Typography>
                        </Alert>
                    </Grid>
                )}
                {projects ? (
                    projects.length ? (
                        projects.map((project) => (
                            <Grid key={`project_${project.id}`} item xs={15} sm={5} lg={3} p={2} mb={2}>
                                <ProjectCard
                                    key={`project_card_${project.id}`}
                                    {...{
                                        project,
                                        refetch: refetchScreenProjects,
                                        refetchProjects,
                                        member: organization.member,
                                    }}
                                />
                            </Grid>
                        ))
                    ) : (
                        <Grid item xs={15}>
                            <Alert severity={'info'} style={{ width: 'auto' }}>
                                No projects found.
                            </Alert>
                        </Grid>
                    )
                ) : (
                    [...Array(15)].map((_el, i) => (
                        <Grid key={i} item xs={15} sm={5} lg={3} p={2} mb={2}>
                            <Card sx={{ backgroundColor: 'transparent' }} elevation={0}>
                                <Skeleton
                                    style={{ flexGrow: 1 }}
                                    animation={'wave'}
                                    variant={'rectangular'}
                                    height={300}
                                />
                            </Card>
                        </Grid>
                    ))
                )}
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

export default DashboardScreen;
