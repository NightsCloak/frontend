import { useAppSelector } from '@intractinc/base/redux/hooks';
import { Grid2 as Grid, Typography } from '@mui/material';
import StataPanel from '@/components/dashboard/StatsPanel';
import RecentUsersChart from '@/components/dashboard/RecentUsersChart';
import RecentUsersTable from '@/components/dashboard/RecentUsersTable';
import RecentSubscriptions from '@/components/dashboard/RecentSubscriptions';
import { makeStyles } from 'tss-react/mui';
import useScreenSize from '@intractinc/base/hooks/useScreenSize';

const AdminDashboard = () => {
    const user = useAppSelector((state) => state.user);
    const { classes } = useStyles();
    const { isSmallScreen } = useScreenSize();

    return (
        <div className={classes.root}>
            <Typography sx={{ mb: 2 }}>Welcome {user.name}</Typography>
            <Grid
                container
                justifyContent={'center'}
                spacing={1}
                alignContent={'stretch'}
                maxHeight={'100%'}
                overflow={isSmallScreen ? 'auto' : 'hidden'}
                sx={{ scrollbarWidth: 'thin' }}
            >
                <Grid size={{ xs: 12, sm: 7 }} key={'recentActiveUsers'}>
                    <RecentUsersChart />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }} key={'records'}>
                    <StataPanel />
                </Grid>
                <Grid size={{ xs: 12, sm: 7 }} key={'recentUsers'}>
                    <RecentUsersTable />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }} key={'recentSubs'}>
                    <RecentSubscriptions />
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
        justifyContent: 'flex-start',
        height: '100%',
    },
}));

export default AdminDashboard;
