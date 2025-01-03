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
import { useWorkspace } from '@intractinc/base/contexts/WorkspaceContext';
import OrganizationTierChip from '@intractinc/base/components/Organizations/OrganizationTierChip';
import ErrorScreen from '@/screens/error/ErrorScreen';
import Holding from '@intractinc/base/layout/Holding';
import PendingOrganizationMemberStatus from '@intractinc/base/components/Organizations/Members/PendingOrganizationMemberStatus';

const NotificationsScreen = () => {
    const { organization, isOrganizationPending, organizationErrorMsg, refetchOrganization, refetchProjects } =
        useWorkspace();
    const [getNotifications, getNotificationsState] = useGetUserNotificationsMutation();
    const [notifications, setNotifications] = useState<NotificationModel[] | null>(null);
    const { updateBreadcrumbs, updateTabTitle } = useTools();
    const { privateChannel } = useEcho();
    const { classes } = useStyles();

    const { nav, queryOptions } = useMeta(getNotifications, getNotificationsState, {
        useSearch: false,
        useTrashed: false,
        queryStrings: { 'filter[organization]': organization?.id },
        skip: !organization || isOrganizationPending,
    });

    const refetchNotifications = () => getNotifications({ options: queryOptions });

    const refetchAfterAction = () => {
        refetchNotifications();
        refetchOrganization();
    };

    useEffect(() => {
        updateBreadcrumbs([
            {
                skeleton: !organization,
                type: 'organization',
                name: organization?.name,
                avatar: organization?.avatar_route,
                uri: `/organizations/${organization?.id}`,
                chip: <OrganizationTierChip {...{ organization }} />,
            },
            { name: 'Notifications' },
        ]);

        if (!organization) {
            return;
        }

        updateTabTitle(`${organization.name} - Notifications`);
    }, [organization]);

    useEffect(() => {
        getNotificationsState.data?.data && setNotifications(getNotificationsState.data.data);
    }, [getNotificationsState]);

    useEffect(() => {
        if (!privateChannel) {
            return;
        }

        const onNotification = (notification: NotificationModel) => {
            if (notification.organization_id === organization?.id) {
                refetchNotifications();
            }
        };

        privateChannel.listen('.notification', onNotification);
        return () => {
            privateChannel && privateChannel.stopListening('.notification', onNotification);
        };
    }, [privateChannel, queryOptions]);

    if (organizationErrorMsg) {
        return (
            <ErrorScreen
                {...{
                    message: organizationErrorMsg,
                    navigateTo: `/home`,
                }}
            />
        );
    }

    if (!organization) {
        return <Holding />;
    }

    if (!organization.member || !organization.member.organizationMember) {
        return (
            <ErrorScreen
                {...{
                    message: 'Invalid permissions.',
                    navigateTo: `/home`,
                }}
            />
        );
    }

    if (isOrganizationPending) {
        return (
            <PendingOrganizationMemberStatus
                {...{
                    organization,
                    member: organization.member.organizationMember,
                    refetch: () => {
                        refetchOrganization();
                        refetchProjects();
                    },
                }}
            />
        );
    }

    return (
        <div className={classes.root}>
            <div className={classes.leftNav}>
                <Stack
                    spacing={1}
                    direction={'row'}
                    alignItems={'center'}
                    divider={<Divider orientation={'vertical'} flexItem />}
                >
                    <MarkAllNotificationsRead {...{ refetch: refetchAfterAction, organization }} />
                    <ClearAllNotifications {...{ refetch: refetchAfterAction, organization }} />
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
                                    <NotificationItem {...{ notification, onRead: refetchOrganization }} />
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
