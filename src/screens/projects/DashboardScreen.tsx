import { Button, Grid, Link, Theme, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { useEffect } from 'react';
import { useTools } from '@intractinc/base/contexts/ToolsContext';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import ErrorScreen from '@/screens/error/ErrorScreen';
import Holding from '@intractinc/base/layout/Holding';
import AddAsset from '@intractinc/base/components/Assets/AddAsset';
import RecentModels from '@intractinc/base/components/Projects/Dashboard/RecentModels';
import RecentCollections from '@intractinc/base/components/Projects/Dashboard/RecentCollections';
import PendingProjectMemberStatus from '@intractinc/base/components/Projects/Members/PendingProjectMemberStatus';
import OrganizationTierChip from '@intractinc/base/components/Organizations/OrganizationTierChip';
import PublicChip from '@intractinc/base/layout/navbar/PublicChip';
import ProjectNavigation from '@intractinc/base/components/Projects/ProjectNavigation';
import RecentReviews from '@intractinc/base/components/Projects/Dashboard/RecentReviews';
import { useWorkspace } from '@intractinc/base/contexts/WorkspaceContext';
import RecentMedia from '@intractinc/base/components/Projects/Dashboard/RecentMedia';

const DashboardScreen = () => {
    const {
        organization,
        isOrganizationPending,
        organizationErrorMsg,
        refetchProjects,
        project,
        projectSocket,
        projectErrorMsg,
        refetchProject,
    } = useWorkspace();
    const { classes } = useStyles();
    const { updateBreadcrumbs, updateTabTitle, updateTools } = useTools();
    const navigate = useNavigate();
    const projectRoute = `/organizations/${project?.organization_id}/projects/${project?.id}`;

    const goToOrg = () => {
        refetchProjects();
        navigate(`/organizations/${organization?.id}`);
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
            {
                skeleton: !project,
                type: 'project',
                name: project?.name,
                avatar: project?.avatar_route,
                chip: project?.is_published ? <PublicChip /> : undefined,
            },
        ]);

        if (!project) {
            return;
        }

        updateTabTitle(project.name);

        if (
            project.member &&
            ((project.member.supportsTeams && project.member.projectGates.contributor) ||
                project.member.projectGates.editor)
        ) {
            updateTools([<AddAsset key={'add_asset'} {...{ project, organization, member: project.member }} />]);
        } else {
            updateTools([]);
        }
    }, [project, organization]);

    useEffect(() => {
        if (isOrganizationPending && project) {
            goToOrg();
        }
    }, [isOrganizationPending, project]);

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

    if (!project || isOrganizationPending) {
        return <Holding />;
    }

    if (!project.member) {
        return (
            <ErrorScreen
                {...{
                    message: 'Invalid permissions.',
                    navigateTo: `/organizations/${organization?.id}`,
                }}
            />
        );
    }

    if (project.member.projectMember?.is_pending_approval) {
        return <PendingProjectMemberStatus {...{ project, member: project.member.projectMember, onLeave: goToOrg }} />;
    }

    return (
        <div className={classes.root}>
            <div className={classes.nav}>
                <ProjectNavigation {...{ project, refetch: refetchProject, refetchProjects }} />
            </div>
            <Grid spacing={2} className={classes.container} container columns={12} alignItems={'top'}>
                <Grid item xs={12} sx={{ mb: 1.5 }}>
                    <div className={classes.dashboardGroup}>
                        <div className={classes.dashboardGroupHeader}>
                            <Link
                                component={RouterLink}
                                to={`${projectRoute}/models`}
                                sx={(theme) => ({ color: theme.palette.text.primary, textDecoration: 'none' })}
                            >
                                <Typography variant={'h6'} fontWeight={'bold'}>
                                    Models
                                </Typography>
                            </Link>
                            <Link
                                component={RouterLink}
                                to={`${projectRoute}/models`}
                                sx={(theme) => ({ color: theme.palette.text.primary, textDecoration: 'none' })}
                            >
                                <Button color={'inherit'} variant={'text'} size={'medium'}>
                                    View All
                                </Button>
                            </Link>
                        </div>
                        <RecentModels {...{ project, socket: projectSocket }} />
                    </div>
                </Grid>
                <Grid item xs={12} sx={{ mb: 1.5 }}>
                    <div className={classes.dashboardGroup}>
                        <div className={classes.dashboardGroupHeader}>
                            <Link
                                component={RouterLink}
                                to={`${projectRoute}/folders`}
                                sx={(theme) => ({ color: theme.palette.text.primary, textDecoration: 'none' })}
                            >
                                <Typography variant={'h6'} fontWeight={'bold'}>
                                    Folders
                                </Typography>
                            </Link>
                            <Link
                                component={RouterLink}
                                to={`${projectRoute}/folders`}
                                sx={(theme) => ({ color: theme.palette.text.primary, textDecoration: 'none' })}
                            >
                                <Button color={'inherit'} variant={'text'} size={'medium'}>
                                    View All
                                </Button>
                            </Link>
                        </div>
                        <RecentCollections {...{ project, socket: projectSocket }} />
                    </div>
                </Grid>
                {project.member.projectGates.editor && (
                    <Grid item xs={12} sx={{ mb: 1.5 }}>
                        <div className={classes.dashboardGroup}>
                            <div className={classes.dashboardGroupHeader}>
                                <Link
                                    component={RouterLink}
                                    to={`${projectRoute}/reviews`}
                                    sx={(theme) => ({ color: theme.palette.text.primary, textDecoration: 'none' })}
                                >
                                    <Typography variant={'h6'} fontWeight={'bold'}>
                                        Reviews
                                    </Typography>
                                </Link>
                                <Link
                                    component={RouterLink}
                                    to={`${projectRoute}/reviews`}
                                    sx={(theme) => ({ color: theme.palette.text.primary, textDecoration: 'none' })}
                                >
                                    <Button color={'inherit'} variant={'text'} size={'medium'}>
                                        View All
                                    </Button>
                                </Link>
                            </div>
                            <RecentReviews {...{ project, socket: projectSocket }} />
                        </div>
                    </Grid>
                )}
                {project.member.projectGates.contributor && (
                    <Grid item xs={12}>
                        <div className={classes.dashboardGroup}>
                            <div className={classes.dashboardGroupHeader}>
                                <Link
                                    component={RouterLink}
                                    to={`${projectRoute}/media`}
                                    sx={(theme) => ({ color: theme.palette.text.primary, textDecoration: 'none' })}
                                >
                                    <Typography variant={'h6'} fontWeight={'bold'}>
                                        Media
                                    </Typography>
                                </Link>
                                <Link
                                    component={RouterLink}
                                    to={`${projectRoute}/media`}
                                    sx={(theme) => ({ color: theme.palette.text.primary, textDecoration: 'none' })}
                                >
                                    <Button color={'inherit'} variant={'text'} size={'medium'}>
                                        View All
                                    </Button>
                                </Link>
                            </div>
                            <RecentMedia {...{ project, socket: projectSocket }} />
                        </div>
                    </Grid>
                )}
            </Grid>
        </div>
    );
};

const useStyles = makeStyles()((theme: Theme) => ({
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
    nav: {
        height: 32,
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: theme.spacing(2.125),
    },
    dashboardGroup: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(2),
    },
    dashboardGroupHeader: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: theme.spacing(1),
        paddingTop: theme.spacing(1),
    },
}));

export default DashboardScreen;
