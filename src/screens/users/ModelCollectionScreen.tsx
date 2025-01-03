import { useEffect, useState } from 'react';
import { useTools } from '@intractinc/base/contexts/ToolsContext';
import { useGetUserAssetCollectionQuery } from '@intractinc/base/redux/features/userAssetCollection';
import { useParams } from 'react-router-dom';
import { Alert, Card, Divider, Grid, Skeleton, Stack, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { useGetUserAssetsMutation } from '@intractinc/base/redux/features/userAsset';
import useMeta from '@intractinc/base/hooks/useMeta';
import AddUserAsset from '@intractinc/base/components/UserAssets/AddUserAsset';
import LinkAssets from '@intractinc/base/components/UserAssetCollections/LinkAssets';
import ErrorScreen from '@/screens/error/ErrorScreen';
import Holding from '@intractinc/base/layout/Holding';
import UserAssetCard from '@intractinc/base/components/UserAssets/UserAssetCard';
import { useEcho } from '@intractinc/base/contexts/EchoContext';
import { AutoDelete } from '@mui/icons-material';
import UserAssetCollectionMenu from '@intractinc/base/components/UserAssetCollections/UserAssetCollectionMenu';
import PublicChip from '@intractinc/base/layout/navbar/PublicChip';

const ModelCollectionScreen = () => {
    const { classes } = useStyles();
    const { collectionId } = useParams() as { collectionId: string };
    const [assets, setAssets] = useState<UserAsset[] | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
    const [getModels, getAssetsState] = useGetUserAssetsMutation();
    // const assetTags = useGetAssetTagsQuery(null);
    const { updateTools, updateTabTitle, updateBreadcrumbs } = useTools();
    const { privateChannel } = useEcho();
    const {
        data: collection,
        error,
        isLoading,
        refetch,
    } = useGetUserAssetCollectionQuery(
        { collectionId },
        {
            refetchOnMountOrArgChange: true,
        }
    );

    const { nav, queryOptions, showTrashed, handleTagChipClicked } = useMeta(getModels, getAssetsState, {
        skip: !collection,
        queryStrings: { 'filter[hasCollection]': collection?.id },
        include: 'collections',
        // tags: assetTags,
        sortSize: true,
    });

    const refetchModels = () => getModels({ options: queryOptions });

    useEffect(() => {
        if (error) {
            const response = error as NotFoundError;
            setErrorMessage(response.data.message);
        }
    }, [error]);

    useEffect(() => {
        if (!collection) {
            updateBreadcrumbs([{ name: 'Folders', uri: '/home/folders' }, { skeleton: true }]);
            return;
        }

        updateTools([<AddUserAsset key={'add_user_asset'} {...{ collection }} />]);
        updateBreadcrumbs([
            { name: 'Folders', uri: '/home/folders' },
            {
                type: 'collection',
                name: collection.name,
                avatar: collection.thumbnail_route,
                chip: collection.is_published ? <PublicChip /> : undefined,
            },
        ]);
        updateTabTitle(collection.name);
    }, [collection]);

    useEffect(() => {
        getAssetsState.data?.data && setAssets(getAssetsState.data.data);
    }, [getAssetsState]);

    useEffect(() => {
        privateChannel &&
            privateChannel
                .listen('.asset.created', refetchModels)
                .listen('.asset.updated', refetchModels)
                .listen('.asset.archived', refetchModels)
                .listen('.asset.restored', refetchModels)
                .listen('.asset.version.created', refetchModels)
                .listen('.asset.version.updated', refetchModels)
                .listen('.asset.version.archived', refetchModels)
                .listen('.asset.ingest.update', refetchModels)
                .listen('.copy.updated', refetchModels);
        return () => {
            privateChannel &&
                privateChannel
                    .stopListening('.asset.created', refetchModels)
                    .stopListening('.asset.updated', refetchModels)
                    .stopListening('.asset.archived', refetchModels)
                    .stopListening('.asset.restored', refetchModels)
                    .stopListening('.asset.version.created', refetchModels)
                    .stopListening('.asset.version.updated', refetchModels)
                    .stopListening('.asset.version.archived', refetchModels)
                    .stopListening('.asset.ingest.update', refetchModels)
                    .stopListening('.copy.updated', refetchModels);
        };
    }, [privateChannel, queryOptions]);

    if (error) {
        return <ErrorScreen message={errorMessage} />;
    }

    if (isLoading || !collection) {
        return <Holding />;
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
                    <UserAssetCollectionMenu
                        {...{
                            collection,
                            refetch,
                        }}
                    />
                    <LinkAssets {...{ collection, onSuccess: refetchModels }} />
                </Stack>
                {nav()}
            </div>
            <Grid className={classes.container} container columns={15} alignItems={'top'}>
                {showTrashed && (
                    <Grid item xs={15}>
                        <Alert icon={<AutoDelete />} severity={'warning'} style={{ width: 'auto' }}>
                            <Typography>
                                Models that have been in trash for more than 7 days will be automatically deleted
                                forever.
                            </Typography>
                        </Alert>
                    </Grid>
                )}
                {assets ? (
                    assets.length ? (
                        assets.map((asset) => (
                            <Grid key={`asset_${asset.id}`} item xs={15} sm={5} lg={3} p={2}>
                                <UserAssetCard
                                    key={`asset_card_${asset.id}`}
                                    {...{ asset, collection, refetch: refetchModels, handleTagChipClicked }}
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
    leftNav: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: theme.spacing(2.125),
    },
}));

export default ModelCollectionScreen;
