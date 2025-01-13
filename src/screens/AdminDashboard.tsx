import { useAppSelector } from '@intractinc/base/redux/hooks';
import { Box, Grid2 as Grid, Paper, Typography } from '@mui/material';
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
        <Box className={classes.root}>
            <Typography sx={{ mb: 2 }}>Welcome {user.name}</Typography>

            <Grid
                container
                component={Paper}
                // flexShrink={1}
                justifyContent={'center'}
                sx={{ pb: 2, p: 2, minHeight: 300 }}
                className={classes.gridContainer}
            >
                <Grid size={{ xs: 12, sm: 7 }} sx={{ mr: isSmallScreen ? 0 : 2 }} key={'recentActiveUsers'}>
                    <RecentUsersChart />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }} key={'records'}>
                    <StataPanel />
                </Grid>
                <Grid size={{ xs: 12, sm: 7 }} sx={{ mr: isSmallScreen ? 0 : 2 }} key={'recentUsers'}>
                    <RecentUsersTable />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }} key={'recentSubs'}>
                    <RecentSubscriptions />
                </Grid>
            </Grid>
        </Box>
    );
};

const useStyles = makeStyles()((theme: Theme) => ({
    root: {
        // display: 'flex',
        // flexDirection: 'column',
        // justifyContent: 'space-evenly',
        // alignContent: 'center',
        flex: 1,
        maxHeight: '100%',
        // margin: theme.spacing(4),
    },
    gridContainer: {
        // '&>*:nth-child(odd)': {
        //     [theme.breakpoints.up('xs')]: {
        //         marginRight: theme.spacing(1),
        //     },
        // },
    },
}));

export default AdminDashboard;
