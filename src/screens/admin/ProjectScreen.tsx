import { makeStyles } from 'tss-react/mui';
import { FC, useEffect, useState } from 'react';
import { Button, Grid, Link, Typography } from '@mui/material';
import { useTools } from '@intractinc/base/contexts/ToolsContext';
import { Link as RouterLink, useParams } from 'react-router-dom';
import ErrorScreen from '@/screens/error/ErrorScreen';
import Holding from '@intractinc/base/layout/Holding';
import OrganizationTierChip from '@intractinc/base/components/Organizations/OrganizationTierChip';
import { useGetProjectAdminQuery } from '@intractinc/base/redux/features/adminProject';
import PublicChip from '@intractinc/base/layout/navbar/PublicChip';
import ProjectRecentModels from '@intractinc/base/components/Admin/Projects/ProjectRecentModels';
import ProjectRecentCollections from '@intractinc/base/components/Admin/Projects/ProjectRecentCollections';
import ProjectNav from '@intractinc/base/components/Projects/ProjectNavigation';
import ProjectRecentReviews from '@intractinc/base/components/Admin/Projects/ProjectRecentReviews';
import ProjectRecentMedia from '@intractinc/base/components/Admin/Projects/ProjectRecentMedia';

const ProjectScreen: FC = () => {
    const { classes } = useStyles();
    const { projectId } = useParams() as { projectId: string };
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const { updateBreadcrumbs, updateTabTitle } = useTools();
    const {
        data: project,
        error,
        isLoading,
        refetch,
    } = useGetProjectAdminQuery(
        { projectId },
        {
            refetchOnMountOrArgChange: true,
        }
    );

    useEffect(() => {
        if (!project || !project.organization) {
            updateBreadcrumbs([
                { name: 'Admin', uri: '/admin' },
                { name: 'Organizations', uri: '/admin/organizations' },
                { skeleton: true },
            ]);
            return;
        }

        updateBreadcrumbs([
            { name: 'Admin', uri: '/admin' },
            { name: 'Organizations', uri: '/admin/organizations' },
            {
                type: 'organization',
                name: project.organization.name,
                uri: `/admin/organizations/${project.organization_id}`,
                avatar: project.organization.avatar_route,
                chip: <OrganizationTierChip {...{ organization: project.organization }} />,
            },
            {
                type: 'project',
                name: project.name,
                avatar: project.avatar_route,
                chip: project.is_published ? <PublicChip /> : undefined,
            },
        ]);
        updateTabTitle(project.name);
    }, [project]);

    useEffect(() => {
        if (error) {
            const response = error as NotFoundError;
            setErrorMessage(response.data.message);
        }
    }, [error]);

    if (errorMessage) {
        return <ErrorScreen message={errorMessage} />;
    }

    if (!project || !project.organization || isLoading) {
        return <Holding />;
    }

    return (
        <div className={classes.root}>
            <div className={classes.nav}>
                <ProjectNav {...{ project, refetch, redirectOnArchive: true }} />
            </div>
            <Grid className={classes.container} container columns={15} alignItems={'top'}>
                <div className={classes.dashboardGroup}>
                    <div className={classes.dashboardGroupHeader}>
                        <Typography variant={'h6'} className={classes.dashboardGroupTitle} fontWeight={'bold'}>
                            Models
                        </Typography>
                        <Link
                            component={RouterLink}
                            to={`/admin/projects/${project.id}/models`}
                            sx={(theme) => ({ color: theme.palette.text.primary, textDecoration: 'none' })}
                        >
                            <Button variant={'text'} size={'medium'}>
                                View All
                            </Button>
                        </Link>
                    </div>
                    <ProjectRecentModels {...{ project }} />
                </div>
                <div className={classes.dashboardGroup}>
                    <div className={classes.dashboardGroupHeader}>
                        <Typography variant={'h6'} className={classes.dashboardGroupTitle} fontWeight={'bold'}>
                            Folders
                        </Typography>
                        <Link
                            component={RouterLink}
                            to={`/admin/projects/${project.id}/folders`}
                            sx={(theme) => ({ color: theme.palette.text.primary, textDecoration: 'none' })}
                        >
                            <Button variant={'text'} size={'medium'}>
                                View All
                            </Button>
                        </Link>
                    </div>
                    <ProjectRecentCollections {...{ project }} />
                </div>
                <div className={classes.dashboardGroup}>
                    <div className={classes.dashboardGroupHeader}>
                        <Typography variant={'h6'} className={classes.dashboardGroupTitle} fontWeight={'bold'}>
                            Reviews
                        </Typography>
                        <Link
                            component={RouterLink}
                            to={`/admin/projects/${project.id}/reviews`}
                            sx={(theme) => ({ color: theme.palette.text.primary, textDecoration: 'none' })}
                        >
                            <Button variant={'text'} size={'medium'}>
                                View All
                            </Button>
                        </Link>
                    </div>
                    <ProjectRecentReviews {...{ project }} />
                </div>
                <div className={classes.dashboardGroup}>
                    <div className={classes.dashboardGroupHeader}>
                        <Typography variant={'h6'} className={classes.dashboardGroupTitle} fontWeight={'bold'}>
                            Media
                        </Typography>
                        <Link
                            component={RouterLink}
                            to={`/admin/projects/${project.id}/media`}
                            sx={(theme) => ({ color: theme.palette.text.primary, textDecoration: 'none' })}
                        >
                            <Button variant={'text'} size={'medium'}>
                                View All
                            </Button>
                        </Link>
                    </div>
                    <ProjectRecentMedia {...{ project }} />
                </div>
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
        paddingRight: theme.spacing(3),
    },
    dashboardGroupHeader: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    dashboardGroupTitle: {
        marginBottom: theme.spacing(1),
        marginTop: theme.spacing(3),
        [theme.breakpoints.down('lg')]: {
            paddingLeft: theme.spacing(2),
        },
    },
}));

export default ProjectScreen;
