import { Button, Link, Theme, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import RecentCommunityCollections from '@intractinc/base/components/UserAssetCollections/RecentCommunityCollections';
import { useTools } from '@intractinc/base/contexts/ToolsContext';
import RecentCommunityProjects from '@intractinc/base/components/Projects/RecentCommunityProjects';
import RecentCommunityTextures from '@intractinc/base/components/Textures/RecentCommunityTextures';

const DashboardScreen = () => {
    const { classes } = useStyles();
    const { updateBreadcrumbs, updateTabTitle } = useTools();
    // const navigate = useNavigate();

    useEffect(() => {
        updateBreadcrumbs([{ name: 'Community' }]);
        updateTabTitle('Community');
    }, []);

    return (
        <div className={classes.root}>
            <div className={classes.dashboardGroup}>
                <div className={classes.dashboardGroupHeader}>
                    <Link
                        component={RouterLink}
                        to={`/community/projects`}
                        sx={(theme) => ({ color: theme.palette.text.primary, textDecoration: 'none' })}
                    >
                        <Typography variant={'h6'} className={classes.dashboardGroupTitle} fontWeight={'bold'}>
                            Projects
                        </Typography>
                    </Link>
                    <Link
                        component={RouterLink}
                        to={`/community/projects`}
                        sx={(theme) => ({ color: theme.palette.text.primary, textDecoration: 'none' })}
                    >
                        <Button color={'inherit'} variant={'text'} size={'medium'}>
                            View All
                        </Button>
                    </Link>
                </div>
                <RecentCommunityProjects />
            </div>
            <div className={classes.dashboardGroup}>
                <div className={classes.dashboardGroupHeader}>
                    <Link
                        component={RouterLink}
                        to={`/community/folders`}
                        sx={(theme) => ({ color: theme.palette.text.primary, textDecoration: 'none' })}
                    >
                        <Typography variant={'h6'} className={classes.dashboardGroupTitle} fontWeight={'bold'}>
                            Member Folders
                        </Typography>
                    </Link>
                    <Link
                        component={RouterLink}
                        to={`/community/folders`}
                        sx={(theme) => ({ color: theme.palette.text.primary, textDecoration: 'none' })}
                    >
                        <Button color={'inherit'} variant={'text'} size={'medium'}>
                            View All
                        </Button>
                    </Link>
                </div>
                <RecentCommunityCollections />
            </div>
            <div className={classes.dashboardGroup}>
                <div className={classes.dashboardGroupHeader}>
                    <Link
                        component={RouterLink}
                        to={`/community/images`}
                        sx={(theme) => ({ color: theme.palette.text.primary, textDecoration: 'none' })}
                    >
                        <Typography variant={'h6'} className={classes.dashboardGroupTitle} fontWeight={'bold'}>
                            Images
                        </Typography>
                    </Link>
                    <Link
                        component={RouterLink}
                        to={`/community/images`}
                        sx={(theme) => ({ color: theme.palette.text.primary, textDecoration: 'none' })}
                    >
                        <Button color={'inherit'} variant={'text'} size={'medium'}>
                            View All
                        </Button>
                    </Link>
                </div>
                <RecentCommunityTextures />
            </div>
        </div>
    );
};

const useStyles = makeStyles()((theme: Theme) => ({
    root: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
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

export default DashboardScreen;
