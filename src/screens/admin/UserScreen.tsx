import { makeStyles } from 'tss-react/mui';
import { FC, useEffect, useState } from 'react';
import { Button, Grid, Link, Typography } from '@mui/material';
import { useTools } from '@intractinc/base/contexts/ToolsContext';
import { Link as RouterLink, useParams } from 'react-router-dom';
import ErrorScreen from '@/screens/error/ErrorScreen';
import Holding from '@intractinc/base/layout/Holding';
import UserSubscriptionChip from '@intractinc/base/components/Billing/User/UserSubscriptionChip';
import { useGetUserAdminQuery } from '@intractinc/base/redux/features/adminUser';
import UserRecentModels from '@intractinc/base/components/Admin/Users/UserRecentModels';
import UserRecentModelCollections from '@intractinc/base/components/Admin/Users/UserRecentModelCollections';
import UserNav from '@intractinc/base/components/Admin/Users/UserNav';
import UserRecentImages from '@intractinc/base/components/Admin/Users/UserRecentImages';
import UserRecentAiImages from '@intractinc/base/components/Admin/Users/UserRecentAiImages';

const UserScreen: FC = () => {
    const { classes } = useStyles();
    const { userId } = useParams() as { userId: string };
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const { updateBreadcrumbs, updateTabTitle } = useTools();
    const {
        data: user,
        error,
        isLoading,
        refetch,
    } = useGetUserAdminQuery(
        { userId },
        {
            refetchOnMountOrArgChange: true,
        }
    );

    useEffect(() => {
        if (!user) {
            updateBreadcrumbs([
                { name: 'Admin', uri: '/admin' },
                { name: 'Users', uri: '/admin/users' },
                { skeleton: true },
            ]);
            return;
        }

        updateBreadcrumbs([
            { name: 'Admin', uri: '/admin' },
            { name: 'Users', uri: '/admin/users' },
            {
                type: 'user',
                name: user.name,
                avatar: user.avatar_route,
                chip: <UserSubscriptionChip {...{ subscription: user.current_subscription }} />,
            },
        ]);
        updateTabTitle(user.name);
    }, [user]);

    useEffect(() => {
        if (error) {
            const response = error as NotFoundError;
            setErrorMessage(response.data.message);
        }
    }, [error]);

    if (errorMessage) {
        return <ErrorScreen message={errorMessage} />;
    }

    if (!user || isLoading) {
        return <Holding />;
    }

    return (
        <div className={classes.root}>
            <div className={classes.nav}>
                <UserNav {...{ user, refetch, redirectOnArchive: true }} />
            </div>
            <Grid className={classes.container} container columns={15} alignItems={'top'}>
                <div className={classes.dashboardGroup}>
                    <div className={classes.dashboardGroupHeader}>
                        <Typography variant={'h6'} className={classes.dashboardGroupTitle} fontWeight={'bold'}>
                            Models
                        </Typography>
                        <Link
                            component={RouterLink}
                            to={`/admin/users/${user.id}/models`}
                            sx={(theme) => ({ color: theme.palette.text.primary, textDecoration: 'none' })}
                        >
                            <Button variant={'text'} size={'medium'}>
                                View All
                            </Button>
                        </Link>
                    </div>
                    <UserRecentModels {...{ user }} />
                </div>
                <div className={classes.dashboardGroup}>
                    <div className={classes.dashboardGroupHeader}>
                        <Typography variant={'h6'} className={classes.dashboardGroupTitle} fontWeight={'bold'}>
                            Folders
                        </Typography>
                        <Link
                            component={RouterLink}
                            to={`/admin/users/${user.id}/folders`}
                            sx={(theme) => ({ color: theme.palette.text.primary, textDecoration: 'none' })}
                        >
                            <Button variant={'text'} size={'medium'}>
                                View All
                            </Button>
                        </Link>
                    </div>
                    <UserRecentModelCollections {...{ user }} />
                </div>
                <div className={classes.dashboardGroup}>
                    <div className={classes.dashboardGroupHeader}>
                        <Typography variant={'h6'} className={classes.dashboardGroupTitle} fontWeight={'bold'}>
                            Images
                        </Typography>
                        <Link
                            component={RouterLink}
                            to={`/admin/users/${user.id}/images`}
                            sx={(theme) => ({ color: theme.palette.text.primary, textDecoration: 'none' })}
                        >
                            <Button variant={'text'} size={'medium'}>
                                View All
                            </Button>
                        </Link>
                    </div>
                    <UserRecentImages {...{ user }} />
                </div>
                <div className={classes.dashboardGroup}>
                    <div className={classes.dashboardGroupHeader}>
                        <Typography variant={'h6'} className={classes.dashboardGroupTitle} fontWeight={'bold'}>
                            A.I. Images
                        </Typography>
                        <Link
                            component={RouterLink}
                            to={`/admin/users/${user.id}/ai-images`}
                            sx={(theme) => ({ color: theme.palette.text.primary, textDecoration: 'none' })}
                        >
                            <Button variant={'text'} size={'medium'}>
                                View All
                            </Button>
                        </Link>
                    </div>
                    <UserRecentAiImages {...{ user }} />
                </div>
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
        justifyContent: 'start',
        overflowY: 'auto',
        transition: `max-height 300ms ease-in-out`,
        '&::-webkit-scrollbar': {
            width: 8,
        },
        scrollbarWidth: 'thin',
        height: 'auto',
    },
    nav: {
        height: 32,
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: theme.spacing(2.125),
    },
    dashboardGroup: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
    },
    dashboardGroupHeader: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    dashboardGroupTitle: {
        marginBottom: theme.spacing(1),
        marginTop: theme.spacing(3),
        [theme.breakpoints.down('lg')]: {
            paddingLeft: theme.spacing(2),
        },
    },
}));

export default UserScreen;
