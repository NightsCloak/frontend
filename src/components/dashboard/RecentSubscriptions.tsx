import { useGetRecentUserSubscriptionsAdminQuery } from '@intractinc/base/redux/features/adminUserSubscription';
import { makeStyles } from 'tss-react/mui';
import { Box, Paper, Typography } from '@mui/material';
import ReactTimeAgo from 'react-timeago';
import UserSubscriptionChip from '@intractinc/base/components/Billing/User/UserSubscriptionChip';

const RecentSubscriptions = () => {
    const { classes } = useStyles();
    const { data: subscriptions } = useGetRecentUserSubscriptionsAdminQuery(null, {
        refetchOnMountOrArgChange: true,
        pollingInterval: 60000,
    });

    // const { toLocaleDateString } = useDateUtils();
    console.log('subs', subscriptions);
    if (!subscriptions) return <Typography>No Recent Subscriptions</Typography>;

    return (
        <Box component={Paper} elevation={4} className={classes.root}>
            <Typography variant={'h6'} color={'intract.main'}>
                Recent Subscriptions
            </Typography>{' '}
            {subscriptions.map((subscription) => {
                if (subscription.user) {
                    return (
                        <div className={classes.main} key={`subscription_${subscription.id}`}>
                            <Typography variant={'body1'}>
                                {subscription.user.first} {subscription.user.last[0]}
                            </Typography>
                            <UserSubscriptionChip subscription={subscription} />
                            <ReactTimeAgo date={new Date(subscription.created_at)} style={{ fontSize: 'small' }} />
                        </div>
                    );
                }
            })}
        </Box>
    );
};

const useStyles = makeStyles()((theme) => ({
    root: {
        flex: 1,
        display: 'flex',
        overflow: 'auto',
        minHeight: 350,
        marginBottom: theme.spacing(3),
        scrollbarWidth: 'none',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        paddingLeft: theme.spacing(1),
    },
    main: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: theme.spacing(1),
    },
}));

export default RecentSubscriptions;
