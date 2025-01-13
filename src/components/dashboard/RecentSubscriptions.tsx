import { useGetRecentUserSubscriptionsAdminQuery } from '@intractinc/base/redux/features/adminUserSubscription';
import { makeStyles } from 'tss-react/mui';
import { Box, Paper, Typography } from '@mui/material';

const RecentSubscriptions = () => {
    const { classes } = useStyles();
    const { data: subscriptions } = useGetRecentUserSubscriptionsAdminQuery(null, {
        refetchOnMountOrArgChange: true,
        pollingInterval: 60000,
    });

    // const { toLocaleDateString } = useDateUtils();
    console.log('subscriptions', subscriptions);
    return (
        <Box component={Paper} elevation={4} className={classes.root}>
            <Typography variant={'h6'} color={'intract.main'}>
                Recent Subscriptions
            </Typography>{' '}
            {subscriptions?.map((subscription) => <Typography> {subscription?.user?.name}</Typography>)}
        </Box>
    );
};

const useStyles = makeStyles()((theme) => ({
    root: {
        // display: 'flex',
        // flex: 1,
        height: 350,
        // overflow: 'auto',
        marginBottom: theme.spacing(3),
        scrollbarWidth: 'none',
        flexDirection: 'column',
        paddingLeft: theme.spacing(1),
    },
    main: {
        overflow: 'auto',
        maxHeight: 350,
    },
}));

export default RecentSubscriptions;
