import { makeStyles } from 'tss-react/mui';
import { FC, useEffect, useState } from 'react';
import { Alert, Card, Grid, Skeleton, Typography } from '@mui/material';
import { useTools } from '@intractinc/base/contexts/ToolsContext';
import useMeta from '@intractinc/base/hooks/useMeta';
import AddUserAsset from '@intractinc/base/components/UserAssets/AddUserAsset';
import { useGetUserAssetsMutation } from '@intractinc/base/redux/features/userAsset';
import { AutoDelete } from '@mui/icons-material';
import { useEcho } from '@intractinc/base/contexts/EchoContext';
import UserAssetCard from '@intractinc/base/components/UserAssets/UserAssetCard';

const ModelsScreen: FC = () => {
    const { classes } = useStyles();
    const [assets, setAssets] = useState<UserAsset[] | null>(null);
    const [getModels, getAssetsState] = useGetUserAssetsMutation();
    // const assetTags = useGetAssetTagsQuery(null);
    const { updateTools, updateBreadcrumbs, updateTabTitle } = useTools();
    const { privateChannel } = useEcho();

    const { nav, queryOptions, showTrashed, handleTagChipClicked } = useMeta(getModels, getAssetsState, {
        include: 'collections',
        // tags: assetTags,
        sortSize: true,
    });

    const refetchModels = () => getModels({ options: queryOptions });

    useEffect(() => {
        getAssetsState.data?.data && setAssets(getAssetsState.data.data);
    }, [getAssetsState]);

    useEffect(() => {
        updateBreadcrumbs([{ name: 'Models' }]);
        updateTabTitle('Models');
        updateTools([<AddUserAsset key={'add_user_asset'} />]);
    }, []);

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

    return (
        <div className={classes.root}>
            {nav()}
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
                                    {...{ asset, refetch: refetchModels, handleTagChipClicked }}
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

const useStyles = makeStyles()(() => ({
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

export default ModelsScreen;
