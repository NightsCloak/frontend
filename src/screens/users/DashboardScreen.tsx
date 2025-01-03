import { Button, Link, Theme, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { useEffect } from 'react';
import { useTools } from '@intractinc/base/contexts/ToolsContext';
import { Link as RouterLink } from 'react-router-dom';
import RecentModels from '@intractinc/base/components/Users/Dashboard/RecentModels';
import RecentImages from '@intractinc/base/components/Users/Dashboard/RecentImages';
import RecentModelCollections from '@intractinc/base/components/Users/Dashboard/RecentModelCollections';

const DashboardScreen = () => {
    const { classes } = useStyles();
    const { updateBreadcrumbs, updateTabTitle } = useTools();

    useEffect(() => {
        updateBreadcrumbs([{ name: 'Dashboard' }]);
        updateTabTitle('Dashboard');
    }, []);

    return (
        <div className={classes.root}>
            {/*<Paper*/}
            {/*    className={classes.dashboardGroup}*/}
            {/*    sx={{*/}
            {/*        border: '1px solud blue',*/}
            {/*    }}*/}
            {/*>*/}
            {/*    <div className={classes.dashboardGroupHeader}>*/}
            {/*        <Typography variant={'h6'} className={classes.dashboardGroupTitle} fontWeight={'bold'}>*/}
            {/*            Getting Started*/}
            {/*        </Typography>*/}
            {/*    </div>*/}
            {/*    <GettingStarted />*/}
            {/*</Paper>*/}
            <div className={classes.dashboardGroup}>
                <div className={classes.dashboardGroupHeader}>
                    <Link
                        component={RouterLink}
                        to={'/home/models'}
                        sx={(theme) => ({ color: theme.palette.text.primary, textDecoration: 'none' })}
                    >
                        <Typography variant={'h6'} className={classes.dashboardGroupTitle} fontWeight={'bold'}>
                            My Models
                        </Typography>
                    </Link>
                    <Link
                        component={RouterLink}
                        to={'/home/models'}
                        sx={(theme) => ({ color: theme.palette.text.primary, textDecoration: 'none' })}
                    >
                        <Button color={'inherit'} variant={'text'} size={'medium'}>
                            View All
                        </Button>
                    </Link>
                </div>
                <RecentModels />
            </div>
            <div className={classes.dashboardGroup}>
                <div className={classes.dashboardGroupHeader}>
                    <Link
                        component={RouterLink}
                        to={'/home/images'}
                        sx={(theme) => ({ color: theme.palette.text.primary, textDecoration: 'none' })}
                    >
                        <Typography variant={'h6'} className={classes.dashboardGroupTitle} fontWeight={'bold'}>
                            My Images
                        </Typography>
                    </Link>
                    <Link
                        component={RouterLink}
                        to={'/home/images'}
                        sx={(theme) => ({ color: theme.palette.text.primary, textDecoration: 'none' })}
                    >
                        <Button color={'inherit'} variant={'text'} size={'medium'}>
                            View All
                        </Button>
                    </Link>
                </div>
                <RecentImages />
            </div>
            <div className={classes.dashboardGroup}>
                <div className={classes.dashboardGroupHeader}>
                    <Link
                        component={RouterLink}
                        to={'/home/folders'}
                        sx={(theme) => ({ color: theme.palette.text.primary, textDecoration: 'none' })}
                    >
                        <Typography variant={'h6'} className={classes.dashboardGroupTitle} fontWeight={'bold'}>
                            My Folders
                        </Typography>
                    </Link>
                    <Link
                        component={RouterLink}
                        to={'/home/folders'}
                        sx={(theme) => ({ color: theme.palette.text.primary, textDecoration: 'none' })}
                    >
                        <Button color={'inherit'} variant={'text'} size={'medium'}>
                            View All
                        </Button>
                    </Link>
                </div>
                <RecentModelCollections />
            </div>
        </div>
    );
};

const useStyles = makeStyles()((theme: Theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
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
