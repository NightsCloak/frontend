import { useGetStatsQuery } from '@intractinc/base/redux/features/adminStats';
import { Spinner } from 'react-activity';
import { Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

const StatsPanel = () => {
    const { classes } = useStyles();
    const { data: stats } = useGetStatsQuery(null, {
        refetchOnMountOrArgChange: true,
        pollingInterval: 180000,
    });

    if (!stats) {
        return <Spinner />;
    }

    return (
        <div className={classes.root}>
            <Typography variant={'h6'} color={'intract.main'}>
                Records
            </Typography>
            <main className={classes.main}>
                {Object.keys(stats).map((key, index) => (
                    <Typography variant={'body2'} style={{ overflow: 'auto' }} key={`stat_${key}`}>
                        {key}: {stats[key]}
                    </Typography>
                ))}
            </main>
        </div>
    );
};

const useStyles = makeStyles()((theme) => ({
    root: {
        // display: 'flex',
        // flex: 1,
        maxHeight: 300,
        // overflow: 'auto',
        marginBottom: theme.spacing(3),
        scrollbarWidth: 'none',
        flexDirection: 'column',
        paddingLeft: theme.spacing(1),
    },
    main: {
        overflow: 'auto',
        maxHeight: 300,
    },
}));

export default StatsPanel;
