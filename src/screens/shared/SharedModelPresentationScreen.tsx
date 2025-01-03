import { FC, useEffect, useRef, useState } from 'react';
import ErrorScreen from '@/screens/error/ErrorScreen';
import Holding from '@intractinc/base/layout/Holding';
import { useParams } from 'react-router-dom';
import { makeStyles } from 'tss-react/mui';
import Portal from '@intractinc/base/components/ModelPortal/Portal';
import { useTools } from '@intractinc/base/contexts/ToolsContext';
import { useGetSharedAssetPresentationQuery } from '@intractinc/base/redux/features/assetPresentation';
import { useAppSelector } from '@intractinc/base/redux/hooks';
import OrganizationTierChip from '@intractinc/base/components/Organizations/OrganizationTierChip';
import PublicChip from '@intractinc/base/layout/navbar/PublicChip';
import { Chip } from '@mui/material';
import { FormatListNumbered } from '@mui/icons-material';
import ModelPortalProvider from '@intractinc/base/providers/ModelPortalProvider';
import MaterialMatcherProvider from '@intractinc/base/providers/MaterialMatcherProvider';
import { BreadcrumbItemProps } from '@intractinc/base/layout/navbar/BreadcrumbItem';

const SharedModelPresentationScreen: FC = () => {
    const auth = useAppSelector((state) => state.auth?.status);
    const user = useAppSelector((state) => state.user.data);
    const guestSession = useAppSelector((state) => state.guest?.id);
    const parent = useRef<HTMLDivElement>(null!);
    const canvas = useRef<HTMLCanvasElement>(null!);
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
    const [asset, setAsset] = useState<Asset | UserAsset | IntractAsset | undefined>(undefined);
    const [previewVersion, setPreviewVersion] = useState<AssetVersion | undefined>(undefined);
    const [previewSavepoint, setPreviewSavepoint] = useState<AssetSave | undefined>(undefined);
    const [sharedModelLoadSaveAction, setSharedModelLoadSaveAction] = useState<SharedModelSaveAction>(undefined);
    const { code } = useParams() as { code: string };
    const { data: presentation, error, refetch } = useGetSharedAssetPresentationQuery({ code });
    const { classes } = useStyles();
    const { updateBreadcrumbs, updateTabTitle } = useTools();

    const isMember =
        presentation &&
        presentation.member &&
        (presentation.member.projectGates.viewer || presentation.member.organizationGates.viewer);

    useEffect(() => {
        if (!presentation || !presentation.assets?.length) {
            return;
        }

        if (!asset) {
            setAsset(presentation.assets[0]);
            return;
        }

        const updated = presentation.assets.find((item) => item.id === asset.id);

        if (updated) {
            setAsset(updated);
        }
    }, [presentation]);

    useEffect(() => {
        if (error) {
            const response = error as NotFoundError;
            setErrorMessage(response.data.message);
        }
    }, [error]);

    useEffect(() => {
        if (!presentation) {
            updateBreadcrumbs([]);
            return;
        }

        const breadcrumbs: BreadcrumbItemProps[] = [
            {
                type: 'organization',
                name: presentation.project?.organization?.name,
                avatar: presentation.project?.organization?.avatar_route,
                uri: isMember ? `/organizations/${presentation.project?.organization_id}` : undefined,
                chip: isMember ? (
                    <OrganizationTierChip {...{ organization: presentation.project?.organization }} />
                ) : undefined,
            },
            {
                type: 'project',
                name: presentation.project?.name,
                avatar: presentation.project?.avatar_route,
                uri: isMember
                    ? `/organizations/${presentation.project?.organization_id}/projects/${presentation.project_id}`
                    : undefined,
                chip: isMember && presentation.project?.is_published ? <PublicChip /> : undefined,
            },
            {
                name: presentation.name,
            },
        ];

        if (asset) {
            breadcrumbs.push({
                type: 'asset',
                name: asset.name,
                avatar: previewVersion?.thumbnail_route ?? asset.version?.thumbnail_route ?? asset.thumbnail_route,
                chip: (
                    <Chip
                        size={'small'}
                        label={`Version ${previewVersion ? previewVersion.iteration : asset.version?.iteration}`}
                        color={'success'}
                        variant={'outlined'}
                        icon={<FormatListNumbered />}
                    />
                ),
            });

            updateTabTitle(asset.name);
        }

        updateBreadcrumbs(breadcrumbs);
    }, [presentation, asset, previewVersion]);

    useEffect(() => {
        if (presentation && asset) {
            if (!auth || (auth && user)) {
                refetch();
            }
        }
    }, [user, auth]);

    if (errorMessage) {
        return <ErrorScreen message={errorMessage} />;
    }

    if (presentation && presentation.assets?.length === 0) {
        return <ErrorScreen message={'No models found with this presentation.'} />;
    }

    if (!presentation || !asset) {
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
                    fetchAsset: refetch,
                    presentation,
                    parent,
                    canvas,
                    setAssetOverride: setAsset,
                    previewVersion,
                    setPreviewVersion,
                    previewSavepoint,
                    setPreviewSavepoint,
                    sharedModelLoadSaveAction,
                    setSharedModelLoadSaveAction,
                    // forceMode: auth || guestSession ? undefined : 'viewer',
                    sharedMode: 'presentation',
                    sharedCode: code,
                    guestSession,
                    member: presentation.member,
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

export default SharedModelPresentationScreen;
