import { FC, useEffect, useRef, useState } from 'react';
import ErrorScreen from '@/screens/error/ErrorScreen';
import Holding from '@intractinc/base/layout/Holding';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetUserAssetMutation } from '@intractinc/base/redux/features/userAsset';
import { makeStyles } from 'tss-react/mui';
import Portal from '@intractinc/base/components/ModelPortal/Portal';
import queryFilterOptions from '@intractinc/base/components/queryFilterOptions';
import { useTools } from '@intractinc/base/contexts/ToolsContext';
import ModelPortalProvider from '@intractinc/base/providers/ModelPortalProvider';
import MaterialMatcherProvider from '@intractinc/base/providers/MaterialMatcherProvider';

const ModelScreen: FC = () => {
    const parent = useRef<HTMLDivElement>(null!);
    const canvas = useRef<HTMLCanvasElement>(null!);
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
    const [asset, setAsset] = useState<Asset | UserAsset | undefined>(undefined);
    const { assetId } = useParams() as { assetId: string };
    const [getUserAsset, { data: userAssetResponse, error: userAssetError }] = useGetUserAssetMutation();
    const { classes } = useStyles();
    const { updateBreadcrumbs, updateTabTitle } = useTools();
    const navigate = useNavigate();
    const pendingAllowed: AssetState[] = ['configureMaterials', 'startingUvUnwrap', 'unwrapping'];

    const fetchAsset = () => {
        getUserAsset({
            assetId,
            options: queryFilterOptions({ load: 'version.activeSave,memberAppend' }),
        });
    };

    const updateConfig = (config: AssetVersion | UserAssetVersion | IntractAssetVersion) => {
        if (!asset) {
            return;
        }
        setAsset((current) => {
            if (!current) {
                return undefined;
            }

            if (current._morphType === 'userAsset' && config._morphType === 'userAssetVersion') {
                return { ...current, version: config };
            }

            return current;
        });
    };

    useEffect(() => {
        fetchAsset();
    }, []);

    useEffect(() => {
        if (asset && asset.id !== assetId) {
            setAsset(undefined);
            fetchAsset();
        }
    }, [asset, assetId]);

    useEffect(() => {
        if (userAssetResponse) {
            setAsset(userAssetResponse);
        }
    }, [userAssetResponse]);

    useEffect(() => {
        if (userAssetError) {
            const error = userAssetError;
            if (error) {
                const response = error as NotFoundError;
                setErrorMessage(response.data.message);
            }
        }
    }, [userAssetError]);

    useEffect(() => {
        updateBreadcrumbs([
            {
                skeleton: !asset,
                type: 'asset',
                name: asset?.name,
                avatar: asset?.version?.thumbnail_route ?? asset?.thumbnail_route,
            },
        ]);

        if (asset) {
            updateTabTitle(asset.name);
        }
    }, [asset]);

    useEffect(() => {
        if (asset && asset.version && asset.is_pending_version && !pendingAllowed.includes(asset.version.state)) {
            navigate(`/home/models/${assetId}/ingest`);
        }
    }, [asset]);

    if (errorMessage) {
        return <ErrorScreen message={errorMessage} />;
    }

    if (!asset) {
        return (
            <div className={classes.root}>
                <Holding />
            </div>
        );
    }

    if (!asset.version) {
        return (
            <ErrorScreen
                {...{
                    message: `${asset.name} could not be loaded.`,
                    navigateTo: '/home',
                }}
            />
        );
    }

    if (asset.is_pending_version && !pendingAllowed.includes(asset.version.state)) {
        return (
            <ErrorScreen
                {...{
                    message: `${asset.name} has not been finalized for use.`,
                    navigateTo: '/home',
                }}
            />
        );
    }

    return (
        <div className={classes.root} ref={parent}>
            <ModelPortalProvider {...{ asset, fetchAsset, updateConfig, parent, canvas, member: asset.member }}>
                <MaterialMatcherProvider>
                    <Portal />
                </MaterialMatcherProvider>
            </ModelPortalProvider>
            <canvas className={classes.canvas} ref={canvas} />
        </div>
    );
};

const useStyles = makeStyles()((theme) => ({
    root: {
        overflow: 'hidden',
        height: '100vh',
        width: '100%',
    },
    canvas: {
        userSelect: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        minHeight: 100,
        minWidth: 100,
        transition: theme.transitions.easing.easeOut,
        outline: 'none',
        border: 'none',
    },
}));

export default ModelScreen;
