import { FC, useEffect, useRef, useState } from 'react';
import ErrorScreen from '@/screens/error/ErrorScreen';
import Holding from '@intractinc/base/layout/Holding';
import { useNavigate, useParams } from 'react-router-dom';
import { makeStyles } from 'tss-react/mui';
import Portal from '@intractinc/base/components/ModelPortal/Portal';

import { useGetSharedAssetMutation } from '@intractinc/base/redux/features/asset';
import { useGetSharedUserAssetMutation } from '@intractinc/base/redux/features/userAsset';
import queryFilterOptions from '@intractinc/base/components/queryFilterOptions';
import { useTools } from '@intractinc/base/contexts/ToolsContext';
import { useAppSelector } from '@intractinc/base/redux/hooks';
import OrganizationTierChip from '@intractinc/base/components/Organizations/OrganizationTierChip';
import PublicChip from '@intractinc/base/layout/navbar/PublicChip';
import { Chip } from '@mui/material';
import { FormatListNumbered } from '@mui/icons-material';
import ModelPortalProvider from '@intractinc/base/providers/ModelPortalProvider';
import MaterialMatcherProvider from '@intractinc/base/providers/MaterialMatcherProvider';

type SharedAssetScreenProps = {
    resource: 'assets' | 'userAssets';
};

const SharedModelScreen: FC<SharedAssetScreenProps> = ({ resource }) => {
    const auth = useAppSelector((state) => state.auth?.status);
    const user = useAppSelector((state) => state.user.data);
    const guestSession = useAppSelector((state) => state.guest?.id);
    const parent = useRef<HTMLDivElement>(null!);
    const canvas = useRef<HTMLCanvasElement>(null!);
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
    const [asset, setAsset] = useState<Asset | UserAsset | undefined>(undefined);
    const [previewVersion, setPreviewVersion] = useState<AssetVersion | undefined>(undefined);
    const [previewSavepoint, setPreviewSavepoint] = useState<AssetSave | undefined>(undefined);
    const [sharedModelLoadSaveAction, setSharedModelLoadSaveAction] = useState<SharedModelSaveAction>(undefined);
    const { code } = useParams() as { code: string };
    const [getAsset, { data: assetResponse, error: assetError }] = useGetSharedAssetMutation();
    const [getUserAsset, { data: userAssetResponse, error: userAssetError }] = useGetSharedUserAssetMutation();
    const { classes } = useStyles();
    const navigate = useNavigate();
    const { updateBreadcrumbs, updateTabTitle } = useTools();

    const isWorkspaceMember =
        asset &&
        asset._morphType === 'asset' &&
        asset.member &&
        (asset.member.projectGates.viewer || asset.member.organizationGates.viewer);

    const fetchAsset = () => {
        resource === 'assets'
            ? getAsset({
                  code,
                  options: queryFilterOptions({ load: 'project.organization,version.activeSave,memberAppend' }),
              })
            : getUserAsset({
                  code,
                  options: queryFilterOptions({ load: 'version.activeSave,memberAppend' }),
              });
    };

    useEffect(() => {
        setAsset(undefined);
        fetchAsset();
    }, [code]);

    useEffect(() => {
        if (asset && asset._morphType === 'userAsset' && asset.member) {
            if (asset.member.isMember) {
                navigate(`/home/shared/models/${asset.id}/editor`);
                return;
            }

            if (asset.member.isOwner) {
                navigate(`/home/models/${asset.id}/editor`);
                return;
            }
        }
    }, [asset]);

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

        updateTabTitle(asset.name);

        if (asset._morphType === 'userAsset') {
            updateBreadcrumbs([
                {
                    type: 'asset',
                    name: asset.name,
                    avatar: asset?.version?.thumbnail_route ?? asset.thumbnail_route,
                },
            ]);

            return;
        }

        updateBreadcrumbs([
            {
                type: 'organization',
                name: asset.project?.organization?.name,
                avatar: asset.project?.organization?.avatar_route,
                uri: isWorkspaceMember ? `/organizations/${asset.project?.organization_id}` : undefined,
                chip: isWorkspaceMember ? (
                    <OrganizationTierChip {...{ organization: asset.project?.organization }} />
                ) : undefined,
            },
            {
                type: 'project',
                name: asset.project?.name,
                avatar: asset.project?.avatar_route,
                uri: isWorkspaceMember
                    ? `/organizations/${asset.project?.organization_id}/projects/${asset.project_id}`
                    : undefined,
                chip: isWorkspaceMember && asset.project?.is_published ? <PublicChip /> : undefined,
            },
            {
                type: 'asset',
                name: asset.name,
                avatar: previewVersion?.thumbnail_route ?? asset.version?.thumbnail_route ?? asset.thumbnail_route,
                chip:
                    asset._morphType === 'asset' ? (
                        <Chip
                            size={'small'}
                            label={`Version ${previewVersion ? previewVersion.iteration : asset.version?.iteration}`}
                            color={'success'}
                            variant={'outlined'}
                            icon={<FormatListNumbered />}
                        />
                    ) : undefined,
            },
        ]);
    }, [asset, previewVersion]);

    useEffect(() => {
        if (asset) {
            if (!auth || (auth && user)) {
                fetchAsset();
            }
        }
    }, [user, auth]);

    if (errorMessage) {
        return <ErrorScreen message={errorMessage} />;
    }

    if (
        !asset ||
        (asset._morphType === 'userAsset' && asset.member && (asset.member.isMember || asset.member.isOwner))
    ) {
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
                    previewVersion,
                    setPreviewVersion,
                    previewSavepoint,
                    setPreviewSavepoint,
                    sharedModelLoadSaveAction,
                    setSharedModelLoadSaveAction,
                    parent,
                    canvas,
                    forceMode: asset._morphType === 'userAsset' ? 'viewer' : undefined,
                    sharedMode: asset._morphType,
                    sharedCode: code,
                    guestSession,
                    member: asset.member,
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

export default SharedModelScreen;
