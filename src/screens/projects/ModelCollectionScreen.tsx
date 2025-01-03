import { useEffect, useState } from 'react';
import { useTools } from '@intractinc/base/contexts/ToolsContext';
import { useParams } from 'react-router-dom';
import { Alert, Card, Divider, Grid, Skeleton, Stack } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import useMeta from '@intractinc/base/hooks/useMeta';
import LinkAssets from '@intractinc/base/components/AssetCollections/LinkAssets';
import ErrorScreen from '@/screens/error/ErrorScreen';
import Holding from '@intractinc/base/layout/Holding';
import { useGetAssetsMutation } from '@intractinc/base/redux/features/asset';
import { useGetAssetCollectionQuery } from '@intractinc/base/redux/features/assetCollection';
import AddAsset from '@intractinc/base/components/Assets/AddAsset';
import AssetCollectionMenu from '@intractinc/base/components/AssetCollections/AssetCollectionMenu';
import AssetCard from '@intractinc/base/components/Assets/AssetCard';
import OrganizationTierChip from '@intractinc/base/components/Organizations/OrganizationTierChip';
import PublicChip from '@intractinc/base/layout/navbar/PublicChip';
import { useWorkspace } from '@intractinc/base/contexts/WorkspaceContext';

const ModelCollectionScreen = () => {
    const { organization, organizationErrorMsg, project, projectErrorMsg, projectSocket } = useWorkspace();
    const { classes } = useStyles();
    const { collectionId } = useParams() as { collectionId: string };
    const [assets, setAssets] = useState<Asset[] | null>(null);
    const [collectionErrorMessage, setCollectionErrorMessage] = useState<string | undefined>(undefined);
    const [getModels, getAssetsState] = useGetAssetsMutation();
    // const assetTags = useGetAssetTagsQuery(null);
    const { updateTools, updateTabTitle, updateBreadcrumbs } = useTools();
    const {
        data: collection,
        error,
        refetch,
    } = useGetAssetCollectionQuery(
        { projectId: project?.id ?? '', collectionId },
        {
            skip: !project,
            refetchOnMountOrArgChange: true,
        }
    );

    const { nav, queryOptions, handleTagChipClicked } = useMeta(getModels, getAssetsState, {
        skip: !project || !collection,
        triggerParams: { projectId: project?.id ?? '' },
        queryStrings: { 'filter[hasCollection]': collection?.id },
        include: 'collections,latestReview,user',
        // tags: assetTags,
        sortSize: true,
        useTrashed: false,
    });

    const refetchModels = () => getModels({ projectId: project?.id ?? '', options: queryOptions });

    useEffect(() => {
        if (error) {
            const response = error as NotFoundError;
            setCollectionErrorMessage(response.data.message);
        }
    }, [error]);

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
                skeleton: !project,
                name: 'Folders',
                uri: `/organizations/${project?.organization_id}/projects/${project?.id}/folders`,
            },
            {
                skeleton: !collection,
                type: 'collection',
                name: collection?.name,
                avatar: collection?.thumbnail_route,
            },
        ]);

        if (project && collection) {
            updateTabTitle(collection.name);

            if (
                project.member &&
                ((project.member.supportsTeams && project.member.projectGates.contributor) ||
                    project.member.projectGates.editor)
            ) {
                updateTools([
                    <AddAsset
                        key={'add_asset'}
                        {...{
                            project,
                            organization,
                            member: project.member,
                            collection,
                        }}
                    />,
                ]);
            } else {
                updateTools([]);
            }
        }
    }, [collection, project, organization]);

    useEffect(() => {
        getAssetsState.data?.data && setAssets(getAssetsState.data.data);
    }, [getAssetsState]);

    useEffect(() => {
        projectSocket &&
            projectSocket
                .listen('.asset.created', refetchModels)
                .listen('.asset.updated', refetchModels)
                .listen('.asset.move.updated', refetchModels)
                .listen('.asset.archived', refetchModels)
                .listen('.asset.restored', refetchModels)
                .listen('.asset.version.created', refetchModels)
                .listen('.asset.version.updated', refetchModels)
                .listen('.asset.version.archived', refetchModels)
                .listen('.asset.ingest.update', refetchModels)
                .listen('.copy.updated', refetchModels)
                .listen('.asset.collection.updated', refetch)
                .listen('.asset.collection.archived', refetch);
        return () => {
            projectSocket &&
                projectSocket
                    .stopListening('.asset.created', refetchModels)
                    .stopListening('.asset.updated', refetchModels)
                    .stopListening('.asset.move.updated', refetchModels)
                    .stopListening('.asset.archived', refetchModels)
                    .stopListening('.asset.restored', refetchModels)
                    .stopListening('.asset.version.created', refetchModels)
                    .stopListening('.asset.version.updated', refetchModels)
                    .stopListening('.asset.version.archived', refetchModels)
                    .stopListening('.asset.ingest.update', refetchModels)
                    .stopListening('.copy.updated', refetchModels)
                    .stopListening('.asset.collection.updated', refetch)
                    .stopListening('.asset.collection.archived', refetch);
        };
    }, [projectSocket, queryOptions]);

    if (projectErrorMsg || collectionErrorMessage || organizationErrorMsg) {
        return (
            <ErrorScreen
                {...{
                    message: organizationErrorMsg ?? projectErrorMsg ?? collectionErrorMessage,
                    navigateTo: organizationErrorMsg
                        ? `/home`
                        : projectErrorMsg
                          ? `/organizations/${organization?.id}`
                          : `/organizations/${organization?.id}/projects/${project?.id}/folders`,
                }}
            />
        );
    }

    if (!project || !collection) {
        return <Holding />;
    }

    if (!project.member) {
        return (
            <ErrorScreen
                {...{
                    message: 'Invalid permissions.',
                    navigateTo: `/organizations/${organization?.id}/projects/${project?.id}`,
                }}
            />
        );
    }

    return (
        <div className={classes.root}>
            <div className={classes.leftNav}>
                <Stack
                    spacing={1}
                    direction={'row'}
                    alignItems={'center'}
                    divider={<Divider orientation={'vertical'} flexItem />}
                >
                    <AssetCollectionMenu
                        {...{
                            project,
                            collection,
                            refetch,
                            member: project.member,
                            redirectOnArchive: true,
                        }}
                    />
                    {project.member.projectGates.editor && <LinkAssets {...{ collection, onSuccess: refetchModels }} />}
                </Stack>
                {nav()}
            </div>
            <Grid className={classes.container} container columns={15} alignItems={'top'}>
                {assets ? (
                    assets.length ? (
                        assets.map((asset) => (
                            <Grid key={`asset_${asset.id}`} item xs={15} sm={5} lg={3} p={2}>
                                <AssetCard
                                    key={`asset_card_${asset.id}`}
                                    {...{
                                        project,
                                        asset,
                                        refetch: refetchModels,
                                        handleTagChipClicked,
                                        collection,
                                        member: project.member,
                                    }}
                                />
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
        paddingRight: theme.spacing(2),
    },
    leftNav: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: theme.spacing(2.125),
    },
}));

export default ModelCollectionScreen;
