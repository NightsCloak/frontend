import { makeStyles } from 'tss-react/mui';
import { FC, useEffect, useState } from 'react';
import { Alert, Card, Grid, Skeleton } from '@mui/material';
import { useTools } from '@intractinc/base/contexts/ToolsContext';
import useMeta from '@intractinc/base/hooks/useMeta';
import ProjectCard from '@intractinc/base/components/Projects/ProjectCard';
import { useGetCommunityProjectsMutation } from '@intractinc/base/redux/features/community';

const ProjectsScreen: FC = () => {
    const { classes } = useStyles();
    const [projects, setProjects] = useState<Project[] | null>(null);
    const [getProjects, getProjectsState] = useGetCommunityProjectsMutation();
    const { updateBreadcrumbs, updateTabTitle } = useTools();

    const { nav } = useMeta(getProjects, getProjectsState, {
        include: 'organization,assetsCount',
        useTrashed: false,
    });

    useEffect(() => {
        getProjectsState.data?.data && setProjects(getProjectsState.data.data);
    }, [getProjectsState]);

    useEffect(() => {
        updateBreadcrumbs([{ name: 'Community', uri: '/community' }, { name: 'Projects' }]);
        updateTabTitle('Community Projects');
    }, []);

    return (
        <div className={classes.root}>
            <div className={classes.leftNav}>{nav()}</div>
            <Grid className={classes.container} container columns={15} alignItems={'top'}>
                {projects ? (
                    projects.length ? (
                        projects.map((project) => (
                            <Grid key={`org_${project.id}`} item xs={15} sm={5} lg={3} p={2}>
                                <ProjectCard
                                    key={`project_card_${project.id}`}
                                    {...{
                                        project,
                                        refetch: () => {},
                                        viaCommunity: true,
                                    }}
                                />
                            </Grid>
                        ))
                    ) : (
                        <Grid item xs={15}>
                            <Alert severity={'info'} style={{ width: 'auto' }}>
                                No published projects.
                            </Alert>
                        </Grid>
                    )
                ) : (
                    [...Array(15)].map((_el, i) => (
                        <Grid key={i} item xs={15} sm={5} lg={3} p={2}>
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
    },
    leftNav: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: theme.spacing(2.125),
    },
}));

export default ProjectsScreen;
