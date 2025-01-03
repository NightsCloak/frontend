import { FC, useEffect, useRef, useState } from 'react';
import ErrorScreen from '@/screens/error/ErrorScreen';
import Holding from '@intractinc/base/layout/Holding';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetAssetMutation } from '@intractinc/base/redux/features/asset';
import { makeStyles } from 'tss-react/mui';
import Portal from '@intractinc/base/components/ModelPortal/Portal';
import queryFilterOptions from '@intractinc/base/components/queryFilterOptions';
import { useTools } from '@intractinc/base/contexts/ToolsContext';
import PublicChip from '@intractinc/base/layout/navbar/PublicChip';
import OrganizationTierChip from '@intractinc/base/components/Organizations/OrganizationTierChip';
import { Chip } from '@mui/material';
import { FormatListNumbered } from '@mui/icons-material';
import { useWorkspace } from '@intractinc/base/contexts/WorkspaceContext';
import ModelPortalProvider from '@intractinc/base/providers/ModelPortalProvider';
import MaterialMatcherProvider from '@intractinc/base/providers/MaterialMatcherProvider';

const ModelScreen: FC = () => {
    const { organization, organizationErrorMsg, project, projectErrorMsg } = useWorkspace();
    const parent = useRef<HTMLDivElement>(null!);
    const canvas = useRef<HTMLCanvasElement>(null!);
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
    const [asset, setAsset] = useState<Asset | UserAsset | undefined>(undefined);
    const { assetId } = useParams() as { assetId: string };
    const [getAsset, { data: assetResponse, error: assetError }] = useGetAssetMutation();
    const { classes } = useStyles();
    const { updateBreadcrumbs, updateTabTitle } = useTools();
    const navigate = useNavigate();
    const pendingAllowed: AssetState[] = ['configureMaterials', 'startingUvUnwrap', 'unwrapping'];

    const fetchAsset = () => {
        if (!project) {
            return;
        }

        getAsset({
            projectId: project.id,
            assetId,
            options: queryFilterOptions({ load: 'version.activeSave,user' }),
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

            if (current._morphType === 'asset' && config._morphType === 'assetVersion') {
                return { ...current, version: config };
            }

            return current;
        });
    };

    useEffect(() => {
        project && fetchAsset();
    }, [project?.id]);

    useEffect(() => {
        if (asset && asset.id !== assetId) {
            setAsset(undefined);
            fetchAsset();
        }
    }, [asset, assetId]);

    useEffect(() => {
        assetResponse && setAsset(assetResponse);
    }, [assetResponse]);

    useEffect(() => {
        if (assetError) {
            const error = assetError;
            if (error) {
                const response = error as NotFoundError;
                setErrorMessage(response.data.message);
            }
        }
    }, [assetError]);

    useEffect(() => {
        updateBreadcrumbs([
            {
                skeleton: !organization,
                type: 'organization',
                name: organization?.name,
                avatar: organization?.avatar_route,
                uri: `/organizations/${organization?.id}`,
                chip: <OrganizationTierChip {...{ organization }} />,
            },
            {
                skeleton: !project,
                type: 'project',
                name: project?.name,
                avatar: project?.avatar_route,
                uri: `/organizations/${project?.organization_id}/projects/${project?.id}`,
                chip: project?.is_published ? <PublicChip /> : undefined,
            },
            {
                skeleton: !asset,
                type: 'asset',
                name: asset?.name,
                avatar: asset?.version?.thumbnail_route ?? asset?.thumbnail_route,
                chip: (
                    <Chip
                        size={'small'}
                        label={`Version ${asset?.version?.iteration}`}
                        color={'success'}
                        variant={'outlined'}
                        icon={<FormatListNumbered />}
                    />
                ),
            },
        ]);

        if (asset) {
            updateTabTitle(asset.name);
        }
    }, [asset, organization, project]);

    useEffect(() => {
        if (asset && asset.version && asset.is_pending_version && !pendingAllowed.includes(asset.version.state)) {
            navigate(`/organizations/${project?.organization_id}/projects/${project?.id}/models/${assetId}/ingest`);
        }
    }, [asset]);

    if (projectErrorMsg || organizationErrorMsg || errorMessage) {
        return (
            <ErrorScreen
                {...{
                    message: organizationErrorMsg ?? projectErrorMsg ?? errorMessage,
                    navigateTo: organizationErrorMsg
                        ? `/home`
                        : projectErrorMsg
                          ? `/organizations/${organization?.id}`
                          : `/organizations/${organization?.id}/projects/${project?.id}/models`,
                }}
            />
        );
    }

    if (!asset || !project) {
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
                    navigateTo: `/organizations/${project.organization_id}/projects/${project.id}`,
                }}
            />
        );
    }

    if (asset.is_pending_version && !pendingAllowed.includes(asset.version.state)) {
        return (
            <ErrorScreen
                {...{
                    message: `${asset.name} has not been finalized for use.`,
                    navigateTo: `/organizations/${project.organization_id}/projects/${project.id}`,
                }}
            />
        );
    }

    return (
        <div className={classes.root} ref={parent}>
            <ModelPortalProvider {...{ asset, fetchAsset, updateConfig, parent, canvas, member: project?.member }}>
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
