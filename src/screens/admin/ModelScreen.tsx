import { FC, useEffect, useRef, useState } from 'react';
import ErrorScreen from '@/screens/error/ErrorScreen';
import Holding from '@intractinc/base/layout/Holding';
import { useParams } from 'react-router-dom';
import { makeStyles } from 'tss-react/mui';
import Portal from '@intractinc/base/components/ModelPortal/Portal';
import queryFilterOptions from '@intractinc/base/components/queryFilterOptions';
import { useGetUserAssetAdminMutation } from '@intractinc/base/redux/features/adminUserAsset';
import { useGetAssetAdminMutation } from '@intractinc/base/redux/features/adminAsset';
import { useTools } from '@intractinc/base/contexts/ToolsContext';
import OrganizationTierChip from '@intractinc/base/components/Organizations/OrganizationTierChip';
import ModelPortalProvider from '@intractinc/base/providers/ModelPortalProvider';
import MaterialMatcherProvider from '@intractinc/base/providers/MaterialMatcherProvider';

const ModelScreen: FC = () => {
    const parent = useRef<HTMLDivElement>(null!);
    const canvas = useRef<HTMLCanvasElement>(null!);
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
    const [asset, setAsset] = useState<Asset | UserAsset | undefined>(undefined);
    const { assetType, assetId } = useParams() as {
        assetType: string;
        assetId: string;
    };
    const [getAsset, { data: assetResponse, error: assetError }] = useGetAssetAdminMutation();
    const [getUserAsset, { data: userAssetResponse, error: userAssetError }] = useGetUserAssetAdminMutation();
    const { classes } = useStyles();
    const { updateTabTitle, updateBreadcrumbs } = useTools();

    const fetchAsset = () => {
        if (assetType === 'asset') {
            getAsset({
                assetId,
                options: queryFilterOptions({ load: 'project.organization,version.activeSave' }),
            });

            return;
        }

        if (assetType === 'userAsset') {
            getUserAsset({
                assetId,
                options: queryFilterOptions({ load: 'user,version.activeSave' }),
            });
        }
    };

    useEffect(() => {
        fetchAsset();
    }, []);

    useEffect(() => {
        if (assetResponse || userAssetResponse) {
            setAsset(assetResponse ?? userAssetResponse);
        }
    }, [assetResponse, userAssetResponse]);

    useEffect(() => {
        if (assetError || userAssetError) {
            const response = (assetError ?? userAssetError) as NotFoundError;
            setErrorMessage(response.data.message);
        }
    }, [assetError, userAssetError]);

    useEffect(() => {
        asset && updateTabTitle(asset.name);
    }, [asset]);

    useEffect(() => {
        if (!asset) {
            updateBreadcrumbs([{ name: 'Admin', uri: '/admin' }, { skeleton: true }, { skeleton: true }]);
            return;
        }

        if (asset._morphType === 'userAsset') {
            updateBreadcrumbs([
                { name: 'Admin', uri: '/admin' },
                { name: 'Users', uri: '/admin/users' },
                {
                    type: 'user',
                    name: asset.user?.name,
                    uri: `/admin/users/${asset.user_id}`,
                    avatar: asset.user?.avatar_route,
                },
                {
                    type: 'asset',
                    name: asset.name,
                    avatar: asset.version?.thumbnail_route ?? asset.thumbnail_route,
                },
            ]);
            return;
        }

        updateBreadcrumbs([
            { name: 'Admin', uri: '/admin' },
            { name: 'Organizations', uri: '/admin/organizations' },
            {
                type: 'organization',
                name: asset.project?.organization?.name,
                uri: `/admin/organizations/${asset.project?.organization_id}`,
                avatar: asset.project?.organization?.avatar_route,
                chip: <OrganizationTierChip {...{ organization: asset.project?.organization }} />,
            },
            {
                type: 'project',
                name: asset.project?.name,
                uri: `/admin/projects/${asset.project_id}`,
                avatar: asset.project?.avatar_route,
            },
            {
                type: 'asset',
                name: asset.name,
                avatar: asset.version?.thumbnail_route ?? asset.thumbnail_route,
            },
        ]);

        updateTabTitle(asset.name);
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
                    forceMode: 'admin',
                    admin: true,
                }}
            >
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
