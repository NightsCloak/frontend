import { Alert, Button, Grid, Link, Stack, Theme, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { useEffect } from 'react';
import { useTools } from '@intractinc/base/contexts/ToolsContext';
import { Link as RouterLink } from 'react-router-dom';
import ErrorScreen from '@/screens/error/ErrorScreen';
import Holding from '@intractinc/base/layout/Holding';
import OrganizationTierChip from '@intractinc/base/components/Organizations/OrganizationTierChip';
import PublicChip from '@intractinc/base/layout/navbar/PublicChip';
import { useWorkspace } from '@intractinc/base/contexts/WorkspaceContext';
import RecentModels from '@intractinc/base/components/Projects/Dashboard/RecentModels';
import { AutoDelete } from '@mui/icons-material';
import RecentCollections from '@intractinc/base/components/Projects/Dashboard/RecentCollections';
import RecentReviews from '@intractinc/base/components/Projects/Dashboard/RecentReviews';
import RecentMedia from '@intractinc/base/components/Projects/Dashboard/RecentMedia';
import EmptyAssetsTrash from '@intractinc/base/components/Projects/EmptyAssetsTrash';
import EmptyAssetCollectionsTrash from '@intractinc/base/components/Projects/EmptyAssetCollectionsTrash';
import EmptyReviewsTrash from '@intractinc/base/components/Projects/EmptyReviewsTrash';
import EmptyProjectMediaTrash from '@intractinc/base/components/Projects/EmptyProjectMediaTrash';

const TrashScreen = () => {
    const { organization, organizationErrorMsg, project, projectErrorMsg, projectSocket } = useWorkspace();
    const { classes } = useStyles();
    const { updateBreadcrumbs, updateTabTitle } = useTools();
    const projectRoute = `/organizations/${project?.organization_id}/projects/${project?.id}/trash`;

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
            {
                name: 'Trash',
            },
        ]);

        if (!project) {
            return;
        }

        updateTabTitle(project.name);
    }, [project, organization]);

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

    return (
        <div className={classes.root}>
            <div className={classes.nav}>
                <div style={{ width: 'auto' }}>
                    <Alert icon={<AutoDelete />} severity={'warning'} style={{ width: 'auto' }}>
                        <Typography>
                            Items that have been in trash for more than 7 days will be deleted forever.
                        </Typography>
                    </Alert>
                </div>
            </div>
            <Grid spacing={1.5} className={classes.container} container columns={12} alignItems={'top'}>
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
                            <Stack direction={'row'} spacing={1}>
                                <EmptyAssetsTrash {...{ project, member: project.member }} />
                                <Link
                                    component={RouterLink}
                                    to={`${projectRoute}/models`}
                                    sx={(theme) => ({ color: theme.palette.text.primary, textDecoration: 'none' })}
                                >
                                    <Button color={'inherit'} variant={'text'} size={'medium'}>
                                        View All
                                    </Button>
                                </Link>
                            </Stack>
                        </div>
                        <RecentModels {...{ project, socket: projectSocket, trashed: true }} />
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
                            <Stack direction={'row'} spacing={1}>
                                <EmptyAssetCollectionsTrash {...{ project, member: project.member }} />
                                <Link
                                    component={RouterLink}
                                    to={`${projectRoute}/folders`}
                                    sx={(theme) => ({ color: theme.palette.text.primary, textDecoration: 'none' })}
                                >
                                    <Button color={'inherit'} variant={'text'} size={'medium'}>
                                        View All
                                    </Button>
                                </Link>
                            </Stack>
                        </div>
                        <RecentCollections {...{ project, socket: projectSocket, trashed: true }} />
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
                                <Stack direction={'row'} spacing={1}>
                                    <EmptyReviewsTrash {...{ project, member: project.member }} />
                                    <Link
                                        component={RouterLink}
                                        to={`${projectRoute}/reviews`}
                                        sx={(theme) => ({ color: theme.palette.text.primary, textDecoration: 'none' })}
                                    >
                                        <Button color={'inherit'} variant={'text'} size={'medium'}>
                                            View All
                                        </Button>
                                    </Link>
                                </Stack>
                            </div>
                            <RecentReviews {...{ project, socket: projectSocket, trashed: true }} />
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
                                <Stack direction={'row'} spacing={1}>
                                    <EmptyProjectMediaTrash {...{ project, member: project.member }} />
                                    <Link
                                        component={RouterLink}
                                        to={`${projectRoute}/media`}
                                        sx={(theme) => ({ color: theme.palette.text.primary, textDecoration: 'none' })}
                                    >
                                        <Button color={'inherit'} variant={'text'} size={'medium'}>
                                            View All
                                        </Button>
                                    </Link>
                                </Stack>
                            </div>
                            <RecentMedia {...{ project, socket: projectSocket, trashed: true }} />
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
    nav: {
        height: 32,
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: theme.spacing(2.125),
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
    dashboardGroup: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
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

export default TrashScreen;
