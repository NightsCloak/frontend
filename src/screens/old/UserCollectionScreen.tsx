import { makeStyles } from 'tss-react/mui';
import { FC, useEffect, useState } from 'react';
import { Alert, Card, Grid, Skeleton } from '@mui/material';
import { useTools } from '@intractinc/base/contexts/ToolsContext';
import useMeta from '@intractinc/base/hooks/useMeta';
import UserAssetCard from '@intractinc/base/components/UserAssets/UserAssetCard';
import { useGetUserAssetsAdminMutation } from '@intractinc/base/redux/features/adminUserAsset';
import { useParams } from 'react-router-dom';
import ErrorScreen from '@/screens/error/ErrorScreen';
import Holding from '@intractinc/base/layout/Holding';
import UserSubscriptionChip from '@intractinc/base/components/Billing/User/UserSubscriptionChip';
import UserNav from '@intractinc/base/components/Admin/Users/UserNav';
import queryFilterOptions from '@intractinc/base/components/queryFilterOptions';
import { useGetUserAssetCollectionAdminMutation } from '@intractinc/base/redux/features/adminUserAssetCollection';
import PublicChip from '@intractinc/base/layout/navbar/PublicChip';
import AuditsModal from '@intractinc/base/components/Admin/AuditsModal';

const UserCollectionScreen: FC = () => {
    const { classes } = useStyles();
    const { collectionId } = useParams() as { collectionId: string };
    const [assets, setAssets] = useState<UserAsset[] | null>(null);
    const [getModels, getAssetsState] = useGetUserAssetsAdminMutation();
    // const assetTags = useGetAssetTagsQuery(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const { updateBreadcrumbs, updateTabTitle } = useTools();
    const [getCollection, { data: collection, error, isLoading }] = useGetUserAssetCollectionAdminMutation();

    const { nav, queryOptions, handleTagChipClicked } = useMeta(getModels, getAssetsState, {
        skip: !collection,
        // include: 'tags',
        // tags: assetTags,
        sortSize: true,
        queryStrings: { 'filter[hasCollection]': collectionId },
    });

    const refetchCollection = () => getCollection({ collectionId, options: queryFilterOptions({ load: 'user' }) });

    const refetchModels = () => getModels({ options: queryOptions });

    useEffect(() => {
        getAssetsState.data?.data && setAssets(getAssetsState.data.data);
    }, [getAssetsState]);

    useEffect(() => {
        refetchCollection();
    }, []);

    useEffect(() => {
        if (!collection || !collection.user) {
            updateBreadcrumbs([
                { name: 'Admin', uri: '/admin' },
                { name: 'Users', uri: '/admin/users' },
                { skeleton: true },
                { name: 'Folders' },
                { skeleton: true },
            ]);
            return;
        }

        updateBreadcrumbs([
            { name: 'Admin', uri: '/admin' },
            { name: 'Users', uri: '/admin/users' },
            {
                type: 'user',
                name: collection.user.name,
                uri: `/admin/users/${collection.user.id}`,
                avatar: collection.user.avatar_route,
                chip: <UserSubscriptionChip {...{ subscription: collection.user.current_subscription }} />,
            },
            { name: 'Folders', uri: `/admin/users/${collection.user.id}/folders` },
            {
                type: 'collection',
                name: collection.name,
                avatar: collection.thumbnail_route,
                chip: collection.is_published ? <PublicChip /> : undefined,
            },
        ]);
        updateTabTitle(collection.user.name);
    }, [collection]);

    useEffect(() => {
        if (error) {
            const response = error as NotFoundError;
            setErrorMessage(response.data.message);
        }
    }, [error]);

    if (errorMessage) {
        return <ErrorScreen message={errorMessage} />;
    }

    if (!collection || !collection.user || isLoading) {
        return <Holding />;
    }

    return (
        <div className={classes.root}>
            <div className={classes.nav}>
                <UserNav
                    {...{
                        user: collection.user,
                        refetch: refetchCollection,
                        redirectOnArchive: true,
                        nodes: <AuditsModal {...{ auditable: collection }} />,
                    }}
                />
                {nav()}
            </div>
            <Grid className={classes.container} container columns={15} alignItems={'top'}>
                {assets ? (
                    assets.length ? (
                        assets.map((asset) => (
                            <Grid key={`asset_${asset.id}`} item xs={15} sm={5} lg={3} p={2}>
                                <UserAssetCard
                                    key={`asset_card_${asset.id}`}
                                    {...{ asset, refetch: refetchModels, handleTagChipClicked, admin: true }}
                                />
                            </Grid>
                        ))
                    ) : (
                        <Grid item xs={15}>
                            <Alert severity={'info'} style={{ width: 'auto' }}>
                                No models found.
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

export default UserCollectionScreen;
