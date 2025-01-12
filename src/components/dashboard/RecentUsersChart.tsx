import { Line } from 'react-chartjs-2';
import { Typography, useTheme } from '@mui/material';
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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const RecentUsersChart = () => {
    const theme = useTheme();
    const { data } = useGetUsersSnapshotQuery();

    const recentUsers = useMemo(() => {
        if (!data) return { labels: [new Date().toLocaleTimeString('en-US')], datasets: [] };
        const reverse = [...data.data].reverse();
        const labels = reverse.map((snapshot) =>
            new Date(snapshot.created_at).toLocaleTimeString('en-US', {
                timeZone: 'America/New_York',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
            })
        );
        const datasets = [
            {
                label: `Recently Active Users`,
                data: reverse.map((snapshot) => snapshot.recently_active),
                borderColor: theme.palette.intract.main,
            },
            {
                label: `Paid Users`,
                data: reverse.map((snapshot) => snapshot.paid_member),
                borderColor: theme.palette.primary.main,
                hidden: true,
            },
            {
                label: `Trashed Users`,
                data: reverse.map((snapshot) => snapshot.trashed),
                borderColor: theme.palette.error.main,
                hidden: true,
            },
            {
                label: `Unverified Users`,
                data: reverse.map((snapshot) => snapshot.unverified),
                borderColor: theme.palette.success.light,
                hidden: true,
            },
            {
                label: `Total Users`,
                data: reverse.map((snapshot) => snapshot.total),
                borderColor: theme.palette.info.main,
                hidden: true,
            },
        ];
        return { labels, datasets };
    }, [data]);

    return (
        <>
            <Typography variant={'h6'}>Recent Users: {recentUsers.datasets?.[0]?.data[0]}</Typography>
            <Line
                options={{
                    responsive: true,
                    plugins: {
                        legend: {
                            display: true,
                            position: 'bottom',
                        },
                        title: {
                            display: false,
                        },
                    },
                }}
                data={recentUsers}
            />
        </>
    );
};

export default RecentUsersChart;
