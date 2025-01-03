import { useNavigate, useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { FC, useEffect, useState } from 'react';
import ErrorScreen from '@/screens/error/ErrorScreen';
import Ingestor from '@intractinc/base/components/AssetIngest/Ingestor';
import { useTools } from '@intractinc/base/contexts/ToolsContext';
import Holding from '@intractinc/base/layout/Holding';
import { useGetIntractAssetAdminMutation } from '@intractinc/base/redux/features/adminIntractAsset';
import ModelUploadProvider from '@intractinc/base/providers/ModelUploadProvider';

const IntractModelUploadScreen: FC = () => {
    const { assetId } = useParams() as { assetId: string };
    const [asset, setAsset] = useState<IntractAsset | undefined>(undefined);
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
    const [getAsset, { data, error }] = useGetIntractAssetAdminMutation();
    const { classes } = useStyles();
    const navigate = useNavigate();
    const { updateBreadcrumbs, updateTabTitle } = useTools();

    const fetchAsset = () => {
        getAsset({
            assetId,
            options: '',
        });
    };

    const updateAsset = (asset: Asset | UserAsset | IntractAsset): void => {
        if (asset._morphType !== 'intractAsset') {
            return;
        }

        setAsset((current) => {
            if (!current) {
                return asset;
            }

            return { ...current, ...asset };
        });
    };

    useEffect(() => {
        updateBreadcrumbs([
            { name: 'Admin', uri: '/admin' },
            { name: 'Intract Models', uri: '/admin/intract-models' },
            { name: 'Model Upload' },
        ]);
        updateTabTitle('Intract Model Upload');
    }, []);

    useEffect(() => {
        fetchAsset();
    }, [assetId]);

    useEffect(() => {
        if (data) {
            if (!data.is_pending) {
                navigate(`/admin/intract-models/${data.id}/editor`);
                return;
            }

            setAsset(data);
        }
    }, [data]);

    useEffect(() => {
        if (error) {
            const response = error as NotFoundError;
            setErrorMessage(response.data.message);
        }
    }, [error]);

    useEffect(() => {
        if (asset?.version?.state === 'configureMaterials') {
            navigate(`/admin/intract-models/${asset.id}/editor`);
            return;
        }

        if (['analyzingIngest', 'matchingMaterials'].includes(asset?.version?.state ?? '')) {
            const interval = setInterval(fetchAsset, 7000);

            return () => {
                clearInterval(interval);
            };
        }
    }, [asset?.version?.state]);

    if (error) {
        return (
            <ErrorScreen
                {...{
                    message: errorMessage,
                    navigateTo: '/home',
                }}
            />
        );
    }

    if (!asset) {
        return <Holding />;
    }

    return (
        <div className={classes.root}>
            <Grid className={classes.container} container alignItems={'top'}>
                <ModelUploadProvider {...{ asset, updateAsset, fetchAsset }}>
                    <Ingestor />
                </ModelUploadProvider>
            </Grid>
        </div>
    );
};

const useStyles = makeStyles()((theme) => ({
    root: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        width: '100%',
        height: `calc(100% - ${theme.spacing(2)})`,
    },
    container: {
        height: '100%',
    },
}));

export default IntractModelUploadScreen;
