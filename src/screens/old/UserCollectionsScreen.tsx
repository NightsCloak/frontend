import { makeStyles } from 'tss-react/mui';
import { FC, useEffect, useState } from 'react';
import { Alert, Card, Grid, Skeleton } from '@mui/material';
import { useTools } from '@intractinc/base/contexts/ToolsContext';
import useMeta from '@intractinc/base/hooks/useMeta';
import { useParams } from 'react-router-dom';
import ErrorScreen from '@/screens/error/ErrorScreen';
import Holding from '@intractinc/base/layout/Holding';
import UserSubscriptionChip from '@intractinc/base/components/Billing/User/UserSubscriptionChip';
import { useGetUserAdminQuery } from '@intractinc/base/redux/features/adminUser';
import UserNav from '@intractinc/base/components/Admin/Users/UserNav';
import { useGetUserAssetCollectionsAdminMutation } from '@intractinc/base/redux/features/adminUserAssetCollection';
import UserAssetCollectionCard from '@intractinc/base/components/UserAssetCollections/UserAssetCollectionCard';

const UserCollectionsScreen: FC = () => {
    const { classes } = useStyles();
    const { userId } = useParams() as { userId: string };
    const [collections, setCollections] = useState<UserAssetCollection[] | null>(null);
    const [getCollections, getCollectionsState] = useGetUserAssetCollectionsAdminMutation();
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

    const { nav, queryOptions, handleTagChipClicked } = useMeta(getCollections, getCollectionsState, {
        skip: !user,
        include: 'assetsCount',
        queryStrings: { 'filter[user]': userId },
    });

    const refetchModels = () => getCollections({ options: queryOptions });

    useEffect(() => {
        getCollectionsState.data?.data && setCollections(getCollectionsState.data.data);
    }, [getCollectionsState]);

    useEffect(() => {
        if (!user) {
            updateBreadcrumbs([
                { name: 'Admin', uri: '/admin' },
                { name: 'Users', uri: '/admin/users' },
                { skeleton: true },
                { name: 'Folders' },
            ]);
            return;
        }

        updateBreadcrumbs([
            { name: 'Admin', uri: '/admin' },
            { name: 'Users', uri: '/admin/users' },
            {
                type: 'user',
                name: user.name,
                uri: `/admin/users/${user.id}`,
                avatar: user.avatar_route,
                chip: <UserSubscriptionChip {...{ subscription: user.current_subscription }} />,
            },
            { name: 'Folders' },
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
                {nav()}
            </div>
            <Grid className={classes.container} container columns={15} alignItems={'top'}>
                {collections ? (
                    collections.length ? (
                        collections.map((collection) => (
                            <Grid key={`collection_${collection.id}`} item xs={15} sm={5} lg={3} p={2}>
                                <UserAssetCollectionCard
                                    key={`collection_card_${collection.id}`}
                                    {...{ collection, refetch: refetchModels, handleTagChipClicked, admin: true }}
                                />
                            </Grid>
                        ))
                    ) : (
                        <Grid item xs={15}>
                            <Alert severity={'info'} style={{ width: 'auto' }}>
                                No folders found.
                            </Alert>
                        </Grid>
                    )
                ) : (
                    [...Array(15)].map((_el, i) => (
                        <Grid key={i} item xs={15} sm={5} lg={3} p={2}>
                            <Card sx={{ backgroundColor: 'transparent' }} elevation={0}>
                                <Skeleton
                                    style={{ flexGrow: 1 }}
                                    animation={'wave'}
                                    variant={'rectangular'}
                                    height={300}
                                />
                            </Card>
                        </Grid>
                    ))
                )}
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
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: theme.spacing(2.125),
    },
}));

export default UserCollectionsScreen;
