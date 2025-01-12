import { useAppSelector } from '@intractinc/base/redux/hooks';
import { Grid2 as Grid, Paper, Typography } from '@mui/material';
import StataPanel from '@/components/dashboard/StatsPanel';
import RecentUsersChart from '@/components/dashboard/RecentUsersChart';

const AdminDashboard = () => {
    const user = useAppSelector((state) => state.user);

    return (
        <>
            <Typography sx={{ mb: 2 }}>Welcome {user.name}</Typography>

            <Grid container component={Paper} flexShrink={1} justifyContent={'start'} sx={{ p: 3, minHeight: 300 }}>
                <Grid size={{ xs: 12, sm: 8 }} key={'recentActiveUsers'}>
                    <RecentUsersChart />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }} sx={{ pl: 2 }} key={'records'}>
                    Records
                    <StataPanel />
                </Grid>
                <Grid size={8} key={'recentUsers'}>
                    Recent Users
                </Grid>
                <Grid size={'auto'} sx={{ pl: 2 }}>
                    Recent Subscriptions
                </Grid>
            </Grid>
        </>
    );
};

export default AdminDashboard;
