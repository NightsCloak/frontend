import { makeStyles } from 'tss-react/mui';
import { useEffect, useState } from 'react';
import {
    Avatar,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Skeleton,
    Stack,
    Typography,
} from '@mui/material';
import { useTools } from '@intractinc/base/contexts/ToolsContext';
import useMeta from '@intractinc/base/hooks/useMeta';
import { useGetUserNotificationsMutation } from '@intractinc/base/redux/features/userNotifications';
import NotificationItem from '@intractinc/base/components/Notifications/NotificationItem';
import { useEcho } from '@intractinc/base/contexts/EchoContext';
import MarkAllNotificationsRead from '@intractinc/base/components/Notifications/MarkAllNotificationsRead';
import ClearAllNotifications from '@intractinc/base/components/Notifications/ClearAllNotifications';

const NotificationsScreen = () => {
    const { classes } = useStyles();
    const [getNotifications, getNotificationsState] = useGetUserNotificationsMutation();
    const [notifications, setNotifications] = useState<NotificationModel[] | null>(null);
    const { updateBreadcrumbs, updateTabTitle } = useTools();
    const { privateChannel } = useEcho();

    const { nav, queryOptions } = useMeta(getNotifications, getNotificationsState, {
        useSearch: false,
        useTrashed: false,
    });

    const refetchNotifications = () => getNotifications({ options: queryOptions });

    useEffect(() => {
        updateBreadcrumbs([{ name: 'My Notifications' }]);
        updateTabTitle('My Notifications');
    }, []);

    useEffect(() => {
        getNotificationsState.data?.data && setNotifications(getNotificationsState.data.data);
    }, [getNotificationsState]);

    useEffect(() => {
        privateChannel && privateChannel.listen('.notification', refetchNotifications);
        return () => {
            privateChannel && privateChannel.stopListening('.notification', refetchNotifications);
        };
    }, [privateChannel, queryOptions]);

    return (
        <div className={classes.root}>
            <div className={classes.leftNav}>
                <Stack
                    spacing={1}
                    direction={'row'}
                    alignItems={'center'}
                    divider={<Divider orientation={'vertical'} flexItem />}
                >
                    <MarkAllNotificationsRead {...{ refetch: refetchNotifications }} />
                    <ClearAllNotifications {...{ refetch: refetchNotifications }} />
                </Stack>
                {nav()}
            </div>
            <Grid className={classes.container} container>
                <Grid item xs={12} sm={10} md={8}>
                    <List sx={{ width: '100%', bgcolor: 'background.paper', paddingY: 0 }}>
                        {!notifications ? (
                            [...Array(10)].map((el, i) => (
                                <div key={i}>
                                    <ListItem alignItems={'flex-start'}>
                                        <ListItemAvatar>
                                            <Skeleton variant={'circular'}>
                                                <Avatar />
                                            </Skeleton>
                                        </ListItemAvatar>
                                        <Skeleton
                                            style={{ flexGrow: 1 }}
                                            animation={'wave'}
                                            variant={'rectangular'}
                                            height={75}
                                        />
                                    </ListItem>
                                    {i + 1 !== 10 && <Divider variant={'inset'} component={'li'} />}
                                </div>
                            ))
                        ) : notifications.length > 0 ? (
                            notifications.map((notification, i) => (
                                <div key={notification.id}>
                                    <NotificationItem {...{ notification }} />
                                    {i + 1 !== notifications.length && <Divider variant={'inset'} component={'li'} />}
                                </div>
                            ))
                        ) : (
                            <ListItem>
                                <ListItemText
                                    sx={{ display: 'flex', justifyContent: 'center' }}
                                    primary={<Typography variant={'h6'}>You have no new notifications.</Typography>}
                                />
                            </ListItem>
                        )}
                    </List>
                </Grid>
            </Grid>
        </div>
    );
};

const useStyles = makeStyles()((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        overflowY: 'auto',
        transition: `max-height 300ms ease-in-out`,
        '&::-webkit-scrollbar': {
            width: 8,
        },
        scrollbarWidth: 'thin',
        height: 'auto',
        paddingRight: theme.spacing(2),
    },
    leftNav: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: theme.spacing(2.125),
    },
}));

export default NotificationsScreen;
