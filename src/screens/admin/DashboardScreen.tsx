import { Grid, Paper, Theme } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { FC, useEffect } from 'react';
import { useTools } from '@intractinc/base/contexts/ToolsContext';
import StatsPanel from '@intractinc/base/components/Admin/StatsPanel';
import UsersPanel from '@intractinc/base/components/Admin/Users/UsersPanel';
import OrganizationSubscriptionsPanel from '@intractinc/base/components/Admin/Organizations/OrganizationSubscriptionsPanel';
import UserSubscriptionsPanel from '@intractinc/base/components/Admin/Users/UserSubscriptionsPanel';
import AuditsPanel from '@intractinc/base/components/Admin/AuditsPanel';

const DashboardScreen: FC = () => {
    const { classes } = useStyles();
    const { updateBreadcrumbs, updateTabTitle } = useTools();

    useEffect(() => {
        updateBreadcrumbs([{ name: 'Admin' }]);
        updateTabTitle('Admin');
    }, []);

    return (
        <div className={classes.root}>
            <Grid spacing={2} container>
                <Grid item xs={12} sm={6} lg={8} xl={4}>
                    <Paper elevation={3} className={classes.gridSection}>
                        <OrganizationSubscriptionsPanel />
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} lg={4} xl={4}>
                    <Paper elevation={3} className={classes.gridSection}>
                        <UsersPanel />
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} lg={4} xl={4}>
                    <Paper elevation={3} className={classes.gridSection}>
                        <UserSubscriptionsPanel />
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} lg={4} xl={4}>
                    <Paper elevation={3} className={classes.gridSection}>
                        <StatsPanel />
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} lg={8} xl={8}>
                    <Paper elevation={3} className={classes.gridSection}>
                        <AuditsPanel />
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

const useStyles = makeStyles()((theme: Theme) => ({
    root: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        margin: theme.spacing(1),
    },
    gridSection: {
        // minWidth: 400,
        marginTop: 1,
        padding: theme.spacing(1),
        margin: theme.spacing(1),
    },
}));

export default DashboardScreen;
