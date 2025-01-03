import { FC, useEffect, useRef, useState } from 'react';
import ErrorScreen from '@/screens/error/ErrorScreen';
import Holding from '@intractinc/base/layout/Holding';
import { useParams } from 'react-router-dom';
import { makeStyles } from 'tss-react/mui';
import Portal from '@intractinc/base/components/ModelPortal/Portal';
import {
    useGetCommunityCollectionAssetMutation,
    useGetCommunityCollectionQuery,
    useGetCommunityProjectAssetMutation,
} from '@intractinc/base/redux/features/community';
import queryFilterOptions from '@intractinc/base/components/queryFilterOptions';
import { useTools } from '@intractinc/base/contexts/ToolsContext';
import ModelPortalProvider from '@intractinc/base/providers/ModelPortalProvider';

const ModelScreen: FC = () => {
    const parent = useRef<HTMLDivElement>(null!);
    const canvas = useRef<HTMLCanvasElement>(null!);
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
    const [asset, setAsset] = useState<Asset | UserAsset | undefined>(undefined);
    const { assetId, projectId, collectionId } = useParams() as {
        assetId: string;
        collectionId?: string;
        projectId?: string;
    };
    const { updateBreadcrumbs, updateTabTitle } = useTools();
    const [getAsset, { data: assetResponse, error: assetError }] = useGetCommunityProjectAssetMutation();
    const [getUserAsset, { data: userAssetResponse, error: userAssetError }] = useGetCommunityCollectionAssetMutation();
    const { data: collection } = useGetCommunityCollectionQuery(
        { collectionId: collectionId ?? '404' },
        {
            skip: !collectionId,
        }
    );
    const { classes } = useStyles();

    const fetchAsset = () => {
        if (projectId) {
            getAsset({
                projectId,
                assetId,
                options: queryFilterOptions({ load: 'project,version.activeSave' }),
            });

            return;
        }

        if (collectionId) {
            getUserAsset({
                collectionId,
                assetId,
                options: queryFilterOptions({ load: 'version.activeSave' }),
            });
        }
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
        if (assetResponse || userAssetResponse) {
            setAsset(assetResponse ?? userAssetResponse);
        }
    }, [assetResponse, userAssetResponse]);

    useEffect(() => {
        if (assetError || userAssetError) {
            const error = assetError ?? userAssetError;
            if (error) {
                const response = error as NotFoundError;
                setErrorMessage(response.data.message);
            }
        }
    }, [assetError, userAssetError]);

    useEffect(() => {
        if (!asset) {
            updateBreadcrumbs([]);
            return;
        }

        if (asset._morphType === 'asset') {
            updateBreadcrumbs([
                { name: 'Community', uri: '/community' },
                { name: 'Projects', uri: '/community/projects' },
                {
                    type: 'project',
                    name: asset.project?.name,
                    avatar: asset.project?.avatar_route,
                    uri: `/community/projects/${asset.project_id}`,
                },
                {
                    type: 'asset',
                    name: asset.name,
                    avatar: asset.version?.thumbnail_route ?? asset.thumbnail_route,
                },
            ]);
        } else {
            updateBreadcrumbs([
                { name: 'Community', uri: '/community' },
                { name: 'Member Folders', uri: '/community/folders' },
                {
                    type: 'user',
                    name: collection?.user?.first,
                    avatar: collection?.user?.avatar_route,
                    skeleton: !collection,
                },
                {
                    type: 'collection',
                    name: collection?.name,
                    avatar: collection?.thumbnail_route,
                    uri: `/community/folders/${collection?.id}`,
                    skeleton: !collection,
                },
                {
                    type: 'asset',
                    name: asset.name,
                    avatar: asset.version?.thumbnail_route ?? asset.thumbnail_route,
                },
            ]);
        }

        updateTabTitle(`Intract - ${asset.name}`);
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

    return (
        <div className={classes.root} ref={parent}>
            <ModelPortalProvider
                {...{
                    asset,
                    fetchAsset,
                    parent,
                    canvas,
                    forceMode: 'viewer',
                    communityReference: collectionId
                        ? collection
                        : asset._morphType === 'asset'
                          ? asset.project
                          : undefined,
                }}
            >
                <Portal />
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
        // backgroundColor: theme.palette.mode === 'dark' ? '#000000' : '#ffffff',
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
