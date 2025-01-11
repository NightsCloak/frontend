import { useAppSelector } from '@intractinc/base/redux/hooks';
import { Grid2 as Grid, Paper, Typography } from '@mui/material';
import StataPanel from '@/components/StatsPanel';

const AdminIndex = () => {
    const user = useAppSelector((state) => state.user);

    return (
        <>
            <Typography sx={{ mb: 2 }}>Welcome {user.name}</Typography>

            <Grid container component={Paper} flexShrink={1} justifyContent={'start'} sx={{ p: 3, minHeight: 300 }}>
                <Grid size={{ xs: 12, sm: 8 }}>Active Users</Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                    Records
                    <StataPanel />
                </Grid>
                <Grid size={8}>Recent Users</Grid>
                <Grid size={'auto'}>Recent Subscriptions</Grid>
            </Grid>
        </>
    );
};

export default AdminIndex;
