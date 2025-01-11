import { useGetStatsQuery } from '@intractinc/base/redux/features/adminAudits';
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
            {Object.keys(stats).map((key) => (
                <Typography style={{ overflow: 'auto' }}>
                    {key}: {stats[key]}
                </Typography>
            ))}
        </div>
    );
};

const useStyles = makeStyles()((theme) => ({
    root: {
        maxHeight: 400,
        overflow: 'auto',
        marginBottom: theme.spacing(3),
        scrollbarWidth: 'none',
    },
}));

export default StatsPanel;
