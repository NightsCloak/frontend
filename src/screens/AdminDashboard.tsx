import { useAppSelector } from '@intractinc/base/redux/hooks';
import { Box, Grid2 as Grid, Paper, Typography } from '@mui/material';
import StataPanel from '@/components/dashboard/StatsPanel';
import RecentUsersChart from '@/components/dashboard/RecentUsersChart';
import RecentUsersTable from '@/components/dashboard/RecentUsersTable';
import RecentSubscriptions from '@/components/dashboard/RecentSubscriptions';
import { makeStyles } from 'tss-react/mui';
import useScreenSize from '@intractinc/base/hooks/useScreenSize';
import { useEffect, useRef, useState } from 'react';

const AdminDashboard = () => {
    const user = useAppSelector((state) => state.user);
    const { classes } = useStyles();
    const { isSmallScreen } = useScreenSize();
    const chartRootRef = useRef<HTMLDivElement>(null);
    const prevDimensions = useRef({ width: 0, height: 0 });
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const observer = new ResizeObserver((entries) => {
            const current = chartRootRef.current?.getBoundingClientRect() ?? { height: 0, width: 0 };
            console.log('test', prevDimensions.current, current);

            let height = entries[0].contentRect.height;
            const width = entries[0].contentRect.width;
            //We're Shrinking Bob!
            console.log('change', width, prevDimensions.current.width);
            if (height >= width) {
                height = height - (prevDimensions.current.width - width);
                if (height < 350) {
                    height = 350;
                }
            }
            const update = { width: width, height: height };
            prevDimensions.current = { width: current.width, height: current.height };
            setDimensions(update);
        });

        if (chartRootRef.current) {
            observer.observe(chartRootRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <Box className={classes.root}>
            <Typography sx={{ mb: 2 }}>Welcome {user.name}</Typography>

            <Grid
                container
                component={Paper}
                // flexShrink={1}
                justifyContent={'center'}
                sx={{ p: 2, minHeight: 300 }}
                className={classes.gridContainer}
                spacing={2}
            >
                <Grid
                    container
                    size={{ xs: 12, sm: 7 }}
                    sx={{ mr: isSmallScreen ? 0 : 2 }}
                    key={'recentActiveUsers'}
                    ref={chartRootRef}
                >
                    <RecentUsersChart {...{ dimensions }} />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }} key={'records'}>
                    <StataPanel />
                </Grid>
                <Grid container size={{ xs: 12, sm: 7 }} sx={{ mr: isSmallScreen ? 0 : 2 }} key={'recentUsers'}>
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
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        // width: '100vw',
        // justifyContent: 'space-evenly',
        // alignContent: 'center',
        // maxHeight: '100%',
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
