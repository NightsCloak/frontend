import { makeStyles } from 'tss-react/mui';
import { FC, useEffect, useState } from 'react';
import { Alert, Card, Skeleton } from '@mui/material';
import { useTools } from '@intractinc/base/contexts/ToolsContext';
import useMeta from '@intractinc/base/hooks/useMeta';
import { useParams } from 'react-router-dom';
import ErrorScreen from '@/screens/error/ErrorScreen';
import Holding from '@intractinc/base/layout/Holding';
import OrganizationTierChip from '@intractinc/base/components/Organizations/OrganizationTierChip';
import PublicChip from '@intractinc/base/layout/navbar/PublicChip';
import { useGetAssetCollectionAdminMutation } from '@intractinc/base/redux/features/adminAssetCollection';
import ProjectNav from '@intractinc/base/components/Projects/ProjectNavigation';
import { useGetAssetsAdminMutation } from '@intractinc/base/redux/features/adminAsset';
import queryFilterOptions from '@intractinc/base/components/queryFilterOptions';
import AssetCard from '@intractinc/base/components/Assets/AssetCard';
import Grid from '@mui/material/Grid2';
import AuditsModal from '@intractinc/base/components/Admin/AuditsModal';

const ProjectCollectionScreen: FC = () => {
    const { classes } = useStyles();
    const { collectionId } = useParams() as { collectionId: string };
    const [assets, setAssets] = useState<Asset[] | null>(null);
    const [getAssets, getAssetsState] = useGetAssetsAdminMutation();
    // const assetTags = useGetAssetTagsQuery(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const { updateBreadcrumbs, updateTabTitle } = useTools();
    const [getCollection, { data: collection, error, isLoading }] = useGetAssetCollectionAdminMutation();

    const { nav, queryOptions, handleTagChipClicked } = useMeta(getAssets, getAssetsState, {
        skip: !collection,
        // include: 'tags',
        // tags: assetTags,
        sortSize: true,
        queryStrings: { 'filter[hasCollection]': collectionId },
    });

    const refetchCollection = () =>
        getCollection({ collectionId, options: queryFilterOptions({ load: 'project.organization' }) });

    const refetchModels = () => getAssets({ options: queryOptions });

    useEffect(() => {
        getAssetsState.data?.data && setAssets(getAssetsState.data.data);
    }, [getAssetsState]);

    useEffect(() => {
        if (!collection || !collection.project || !collection.project.organization) {
            updateBreadcrumbs([
                { name: 'Admin', uri: '/admin' },
                { name: 'Organizations', uri: '/admin/organizations' },
                { skeleton: true },
                { skeleton: true },
                { name: 'Folders' },
                { skeleton: true },
            ]);
            return;
        }

        updateBreadcrumbs([
            { name: 'Admin', uri: '/admin' },
            { name: 'Organizations', uri: '/admin/organizations' },
            {
                type: 'organization',
                name: collection.project.organization.name,
                uri: `/admin/organizations/${collection.project.organization_id}`,
                avatar: collection.project.organization.avatar_route,
                chip: <OrganizationTierChip {...{ organization: collection.project.organization }} />,
            },
            {
                type: 'project',
                name: collection.project.name,
                uri: `/admin/projects/${collection.project_id}`,
                avatar: collection.project.avatar_route,
                chip: collection.project.is_published ? <PublicChip /> : undefined,
            },
            { name: 'Folders', uri: `/admin/projects/${collection.project_id}/folders` },
            {
                type: 'collection',
                name: collection.name,
                avatar: collection.thumbnail_route,
                chip: collection.is_published ? <PublicChip /> : undefined,
            },
        ]);
        updateTabTitle(collection.name);
    }, [collection]);

    useEffect(() => {
        if (error) {
            const response = error as NotFoundError;
            setErrorMessage(response.data.message);
        }
    }, [error]);

    useEffect(() => {
        refetchCollection();
    }, []);

    if (errorMessage) {
        return <ErrorScreen message={errorMessage} />;
    }

    if (!collection || !collection.project || isLoading) {
        return <Holding />;
    }

    return (
        <div className={classes.root}>
            <div className={classes.nav}>
                <ProjectNav
                    {...{
                        project: collection.project,
                        refetch: refetchCollection,
                        nodes: <AuditsModal {...{ auditable: collection }} />,
                    }}
                />
                {nav()}
            </div>
            <Grid className={classes.container} container columns={15} alignItems={'top'}>
                {assets ? (
                    assets.length ? (
                        assets.map((asset) => (
                            <Grid key={`asset_${asset.id}`} size={{ xs: 15, sm: 5, lg: 3 }} p={2}>
                                <AssetCard
                                    key={`asset_card_${asset.id}`}
                                    {...{ asset, refetch: refetchModels, handleTagChipClicked, admin: true }}
                                />
                            </Grid>
                        ))
                    ) : (
                        <Grid size={{ xs: 15 }}>
                            <Alert severity={'info'} style={{ width: 'auto' }}>
                                No models found.
                            </Alert>
                        </Grid>
                    )
                ) : (
                    [...Array(15)].map((_el, i) => (
                        <Grid key={i} size={{ xs: 15, sm: 5, lg: 3 }} p={2}>
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

const useStyles = makeStyles()((theme) => ({
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
    nav: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: theme.spacing(2.125),
    },
}));

export default ProjectCollectionScreen;
