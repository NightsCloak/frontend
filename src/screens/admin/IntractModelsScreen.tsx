import { makeStyles } from 'tss-react/mui';
import { FC, useEffect, useState } from 'react';
import { Alert, Card, Grid, Skeleton } from '@mui/material';
import { useTools } from '@intractinc/base/contexts/ToolsContext';
import useMeta from '@intractinc/base/hooks/useMeta';
import { useGetIntractAssetsAdminMutation } from '@intractinc/base/redux/features/adminIntractAsset';
import AddIntractAsset from '@intractinc/base/components/IntractAssets/AddIntractAsset';
import IntractAssetCard from '@intractinc/base/components/IntractAssets/IntractAssetCard';

const IntractModelsScreen: FC = () => {
    const { classes } = useStyles();
    const [assets, setAssets] = useState<IntractAsset[] | null>(null);
    const [getModels, getModelsState] = useGetIntractAssetsAdminMutation();
    const { updateBreadcrumbs, updateTabTitle, updateTools } = useTools();

    const { nav, queryOptions } = useMeta(getModels, getModelsState, {
        include: 'user',
        sortSize: true,
    });

    const refetchModels = () => getModels({ options: queryOptions });

    useEffect(() => {
        getModelsState.data?.data && setAssets(getModelsState.data.data);
    }, [getModelsState]);

    useEffect(() => {
        updateBreadcrumbs([{ name: 'Admin', uri: '/admin' }, { name: 'Intract Models' }]);
        updateTabTitle('Intract Models');
        updateTools([<AddIntractAsset key={'add_intract_asset'} />]);
    }, []);

    return (
        <div className={classes.root}>
            {nav()}
            <Grid className={classes.container} container columns={15} alignItems={'top'}>
                {assets ? (
                    assets.length ? (
                        assets.map((asset) => (
                            <Grid key={`asset_${asset.id}`} item xs={15} sm={5} lg={3} p={2}>
                                <IntractAssetCard {...{ asset, refetch: refetchModels }} />
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

export default IntractModelsScreen;
