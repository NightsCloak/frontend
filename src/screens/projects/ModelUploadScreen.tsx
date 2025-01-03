import { useNavigate, useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { FC, useEffect, useState } from 'react';
import ErrorScreen from '@/screens/error/ErrorScreen';
import { useGetAssetMutation } from '@intractinc/base/redux/features/asset';
import Ingestor from '@intractinc/base/components/AssetIngest/Ingestor';
import { useTools } from '@intractinc/base/contexts/ToolsContext';
import Holding from '@intractinc/base/layout/Holding';
import OrganizationTierChip from '@intractinc/base/components/Organizations/OrganizationTierChip';
import PublicChip from '@intractinc/base/layout/navbar/PublicChip';
import queryFilterOptions from '@intractinc/base/components/queryFilterOptions';
import { useWorkspace } from '@intractinc/base/contexts/WorkspaceContext';
import ModelUploadProvider from '@intractinc/base/providers/ModelUploadProvider';

const ModelUploadScreen: FC = () => {
    const { organization, organizationErrorMsg, project, projectErrorMsg } = useWorkspace();
    const { assetId } = useParams() as { assetId: string };
    const [asset, setAsset] = useState<Asset | undefined>(undefined);
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
    const [getAsset, { data, error }] = useGetAssetMutation();
    const { classes } = useStyles();
    const navigate = useNavigate();
    const { updateBreadcrumbs, updateTabTitle } = useTools();

    const fetchAsset = () => {
        getAsset({
            projectId: project?.id ?? '',
            assetId,
            options: queryFilterOptions({ load: 'project' }),
        });
    };

    const updateAsset = (asset: Asset | UserAsset | IntractAsset): void => {
        if (asset._morphType !== 'asset') {
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
        const isFirstVersion = asset?.version?.iteration === 1;

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
                uri: `/organizations/${organization?.id}/projects/${project?.id}`,
                chip: project?.is_published ? <PublicChip /> : undefined,
            },
            {
                skeleton: !project,
                name: 'Models',
                uri: `/organizations/${organization?.id}/projects/${project?.id}/models`,
            },
            {
                skeleton: !asset,
                type: 'asset',
                name: asset?.name,
                avatar: asset?.version?.thumbnail_route ?? asset?.thumbnail_route,
            },
            { name: isFirstVersion ? 'Model Upload' : 'Version Upload' },
        ]);

        if (!project || !asset) {
            return;
        }

        updateTabTitle(`${project.name} - Model Upload`);
    }, [project, asset]);

    useEffect(() => {
        project && fetchAsset();
    }, [project?.id, assetId]);

    useEffect(() => {
        if (data) {
            if ((!data.is_pending && !data.is_pending_version) || data.version?.state === 'configureMaterials') {
                navigate(
                    `/organizations/${project?.organization_id}/projects/${data.project_id}/models/${data.id}/editor`
                );
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
            navigate(
                `/organizations/${project?.organization_id}/projects/${asset.project_id}/models/${asset.id}/editor`
            );
            return;
        }

        if (['analyzingIngest', 'matchingMaterials'].includes(asset?.version?.state ?? '')) {
            const interval = setInterval(fetchAsset, 7000);

            return () => {
                clearInterval(interval);
            };
        }
    }, [asset?.version?.state]);

    if (projectErrorMsg || organizationErrorMsg || errorMessage) {
        return (
            <ErrorScreen
                {...{
                    message: organizationErrorMsg ?? projectErrorMsg ?? errorMessage,
                    navigateTo: organizationErrorMsg
                        ? `/home`
                        : projectErrorMsg
                          ? `/organizations/${organization?.id}`
                          : `/organizations/${organization?.id}/projects/${project?.id}`,
                }}
            />
        );
    }

    if (!project || !asset) {
        return <Holding />;
    }

    if (!project.member) {
        return (
            <ErrorScreen
                {...{
                    message: 'Invalid permissions.',
                    navigateTo: `/organizations/${organization?.id}`,
                }}
            />
        );
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
        height: `calc(100% - ${theme.spacing(1)})`,
    },
    container: {
        height: '100%',
    },
}));

export default ModelUploadScreen;
