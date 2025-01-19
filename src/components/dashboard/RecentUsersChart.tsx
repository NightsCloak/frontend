import { Box, Paper, Typography, useTheme } from '@mui/material';
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js';
import { useGetUsersSnapshotQuery } from '@intractinc/base/redux/features/adminStats';
import { useMemo } from 'react';
import { makeStyles } from 'tss-react/mui';
import { LineChartPro } from '@mui/x-charts-pro';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const RecentUsersChart = () => {
    const { data } = useGetUsersSnapshotQuery();
    const { classes } = useStyles();
    const theme = useTheme();

    const fields: { [key: string]: string } = {
        paid_members: 'Paid Members',
        recently_active: 'Recently Active',
        total: 'Total',
        trashed: 'Trashed',
        unverified: 'Unverified',
    };

    const colors: { [key: string]: string } = {
        paid_members: theme.palette.success.dark,
        recently_active: theme.palette.intract.main,
        total: theme.palette.info.light,
        trashed: theme.palette.error.main,
        unverified: theme.palette.warning.light,
    };

    const recentUsers = useMemo(
        () =>
            !data?.data
                ? []
                : data.data
                      .map((snapshot) => ({
                          created_at: new Date(snapshot.created_at).toLocaleTimeString('US', {
                              hour: '2-digit',
                              minute: '2-digit',
                          }),
                          paid_members: snapshot.paid_member,
                          total: snapshot.total,
                          trashed: snapshot.trashed,
                          recently_active: snapshot.recently_active,
                          unverified: snapshot.unverified,
                      }))
                      .reverse(),
        [data]
    );

    const stackStrategy = {
        stack: 'total',
        area: false,
        // stackOffset: 'none', // To stack 0 on top of others
    } as const;

    const handleLegendClick = (
        event: React.MouseEvent<SVGRectElement, MouseEvent>,
        legendItem: SeriesLegendItemContext,
        index: number
    ) => {
        console.log('e', event, legendItem, index);
    };

    return (
        <Box className={classes.root} component={Paper} elevation={4} p={2}>
            <Typography variant={'h6'} color={'intract.main'} display={'flex'} flexDirection={'row'}>
                Recent Users:{' '}
                <Typography style={{ color: '#FFF' }}>
                    {/*&nbsp;{recentUsers.datasets?.[0]?.data[recentUsers.datasets?.[0]?.data.length - 1]}*/}
                </Typography>
            </Typography>
            <LineChartPro
                dataset={recentUsers}
                xAxis={[
                    {
                        dataKey: 'created_at',
                        scaleType: 'point',
                    },
                ]}
                series={Object.keys(fields).map((key) => ({
                    type: 'line',
                    dataKey: key,
                    label: fields[key],
                    color: colors[key],
                    showMark: false,
                    ...stackStrategy,
                }))}
                resolveSizeBeforeRender
                margin={{ top: 5, right: 20, bottom: 100, left: 40 }}
                slotProps={{
                    legend: {
                        position: { vertical: 'bottom', horizontal: 'middle' },
                        onItemClick: handleLegendClick,
                    },
                }}
            />
        </Box>
    );
};

const useStyles = makeStyles()((theme) => ({
    root: {
        flex: 1,
        display: 'flex',
        overflow: 'auto',
        height: '100%',
        maxHeight: 'calc(50vh - 20px)',
        scrollbarWidth: 'none',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        paddingLeft: theme.spacing(1),
    },
}));

export default RecentUsersChart;
