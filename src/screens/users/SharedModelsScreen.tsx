import { makeStyles } from 'tss-react/mui';
import { FC, useEffect, useState } from 'react';
import { Alert, Card, Grid, Skeleton } from '@mui/material';
import { useTools } from '@intractinc/base/contexts/ToolsContext';
import useMeta from '@intractinc/base/hooks/useMeta';
import { useGetMySharedUserAssetsMutation } from '@intractinc/base/redux/features/userAsset';
import UserAssetCard from '@intractinc/base/components/UserAssets/UserAssetCard';
import { useEcho } from '@intractinc/base/contexts/EchoContext';

const SharedModelsScreen: FC = () => {
    const { classes } = useStyles();
    const [assets, setAssets] = useState<UserAsset[] | null>(null);
    const [getModels, getAssetsState] = useGetMySharedUserAssetsMutation();
    // const assetTags = useGetAssetTagsQuery(null);
    const { updateBreadcrumbs, updateTabTitle } = useTools();
    const { privateChannel } = useEcho();

    const { nav, queryOptions, handleTagChipClicked } = useMeta(getModels, getAssetsState, {
        // include: 'tags',
        // tags: assetTags,
        sortSize: true,
        useTrashed: false,
    });

    const refetchModels = () => getModels({ options: queryOptions });

    useEffect(() => {
        getAssetsState.data?.data && setAssets(getAssetsState.data.data);
    }, [getAssetsState]);

    useEffect(() => {
        updateBreadcrumbs([{ name: 'Shared With Me' }]);
        updateTabTitle('Shared With Me');
    }, []);

    useEffect(() => {
        privateChannel &&
            privateChannel.listen('.asset.member.added', refetchModels).listen('.asset.member.removed', refetchModels);
        return () => {
            privateChannel &&
                privateChannel
                    .stopListening('.asset.member.added', refetchModels)
                    .stopListening('.asset.member.removed', refetchModels);
        };
    }, [privateChannel, queryOptions]);

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
                                    {...{ asset, refetch: refetchModels, handleTagChipClicked, viaShared: true }}
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

export default SharedModelsScreen;
