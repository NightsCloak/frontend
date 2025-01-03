import { useEffect, useState } from 'react';
import { useTools } from '@intractinc/base/contexts/ToolsContext';
import { useParams } from 'react-router-dom';
import { Alert, Card, Grid, Skeleton } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import useMeta from '@intractinc/base/hooks/useMeta';
import {
    useGetCommunityCollectionAssetsMutation,
    useGetCommunityCollectionQuery,
} from '@intractinc/base/redux/features/community';
import ErrorScreen from '@/screens/error/ErrorScreen';
import Holding from '@intractinc/base/layout/Holding';
import UserAssetCard from '@intractinc/base/components/UserAssets/UserAssetCard';

const ModelCollectionScreen = () => {
    const { classes } = useStyles();
    const { collectionId } = useParams() as { collectionId: string };
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
    const [assets, setAssets] = useState<UserAsset[] | null>(null);
    const [getModels, getAssetsState] = useGetCommunityCollectionAssetsMutation();
    // const assetTags = useGetAssetTagsQuery(null);
    const { updateBreadcrumbs, updateTabTitle } = useTools();
    const {
        data: collection,
        error,
        isLoading,
    } = useGetCommunityCollectionQuery(
        { collectionId },
        {
            refetchOnMountOrArgChange: true,
        }
    );
    const { nav, handleTagChipClicked } = useMeta(getModels, getAssetsState, {
        skip: !collection,
        triggerParams: collection && { collectionId: collection.id },
        include: 'collections',
        // tags: assetTags,
        useTrashed: false,
    });

    useEffect(() => {
        if (error) {
            const response = error as NotFoundError;
            setErrorMessage(response.data.message);
        }
    }, [error]);

    useEffect(() => {
        if (!collection) {
            updateBreadcrumbs([
                { name: 'Community', uri: '/community' },
                { name: 'Member Folders', uri: '/community/folders' },
                { skeleton: true },
                { skeleton: true },
            ]);

            return;
        }

        updateBreadcrumbs([
            { name: 'Community', uri: '/community' },
            { name: 'Member Folders', uri: '/community/folders' },
            {
                type: 'user',
                name: collection.user?.first,
                avatar: collection.user?.avatar_route,
            },
            {
                type: 'collection',
                name: collection.name,
                avatar: collection.thumbnail_route,
            },
        ]);
        updateTabTitle(collection.name);
    }, [collection]);

    useEffect(() => {
        getAssetsState.data?.data && setAssets(getAssetsState.data.data);
    }, [getAssetsState]);

    if (error) {
        return <ErrorScreen message={errorMessage} />;
    }

    if (isLoading || !collection) {
        return <Holding />;
    }

    return (
        <div className={classes.root}>
            {nav()}
            <Grid className={classes.container} container columns={15} alignItems={'top'}>
                {assets ? (
                    assets.length ? (
                        assets.map((asset) => (
                            <Grid key={`asset_${asset.id}`} item xs={15} sm={5} lg={3} p={2}>
                                <UserAssetCard
                                    key={`asset_card_${asset.id}`}
                                    {...{
                                        asset,
                                        communityCollection: collection,
                                        refetch: () => {},
                                        handleTagChipClicked,
                                    }}
                                />
                            </Grid>
                        ))
                    ) : (
                        <Grid item xs={15}>
                            <Alert severity={'info'} style={{ width: 'auto' }}>
                                No models available.
                            </Alert>
                        </Grid>
                    )
                ) : (
                    [...Array(15)].map((_el, i) => (
                        <Grid key={i} item xs={15} sm={5} lg={3} p={2}>
                            <Card elevation={0}>
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

const useStyles = makeStyles()((_theme) => ({
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
}));

export default ModelCollectionScreen;
