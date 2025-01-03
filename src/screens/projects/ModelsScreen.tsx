import { makeStyles } from 'tss-react/mui';
import { FC, useEffect, useState } from 'react';
import { Alert, Card, Grid, Skeleton } from '@mui/material';
import { useTools } from '@intractinc/base/contexts/ToolsContext';
import useMeta from '@intractinc/base/hooks/useMeta';
import { useGetAssetsMutation } from '@intractinc/base/redux/features/asset';
import ErrorScreen from '@/screens/error/ErrorScreen';
import Holding from '@intractinc/base/layout/Holding';
import AddAsset from '@intractinc/base/components/Assets/AddAsset';
import AssetCard from '@intractinc/base/components/Assets/AssetCard';
import OrganizationTierChip from '@intractinc/base/components/Organizations/OrganizationTierChip';
import PublicChip from '@intractinc/base/layout/navbar/PublicChip';
import ProjectNavigation from '@intractinc/base/components/Projects/ProjectNavigation';
import { useWorkspace } from '@intractinc/base/contexts/WorkspaceContext';

const ModelsScreen: FC = () => {
    const {
        organization,
        organizationErrorMsg,
        refetchProjects,
        project,
        workspaceProjectId,
        projectErrorMsg,
        projectSocket,
        refetchProject,
    } = useWorkspace();
    const { classes } = useStyles();
    const [assets, setAssets] = useState<Asset[] | null>(null);
    const [getModels, getAssetsState] = useGetAssetsMutation();
    // const assetTags = useGetAssetTagsQuery(null);
    const { updateTools, updateBreadcrumbs, updateTabTitle } = useTools();

    const { nav, queryOptions, handleTagChipClicked } = useMeta(getModels, getAssetsState, {
        skip: !project || project.id !== workspaceProjectId,
        triggerParams: project && { projectId: project.id },
        include: 'collections,latestReview,user',
        // tags: assetTags,
        sortSize: true,
        useTrashed: false,
    });

    const refetchModels = () => getModels({ projectId: project?.id ?? '', options: queryOptions });

    useEffect(() => {
        getAssetsState.reset();
        setAssets(null);
    }, [workspaceProjectId]);

    useEffect(() => {
        getAssetsState.data?.data && setAssets(getAssetsState.data.data);
    }, [getAssetsState]);

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
                uri: `/organizations/${organization?.id}/projects/${project?.id}`,
                chip: project?.is_published ? <PublicChip /> : undefined,
            },
            { name: 'Models' },
        ]);

        if (!project) {
            return;
        }

        updateTabTitle(`${project.name} - Models`);

        if (
            project.member &&
            ((project.member.supportsTeams && project.member.projectGates.contributor) ||
                project.member.projectGates.editor)
        ) {
            updateTools([<AddAsset key={'add_asset'} {...{ project, organization, member: project.member }} />]);
        } else {
            updateTools([]);
        }
    }, [project]);

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
                .listen('.copy.updated', refetchModels);
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
                    .stopListening('.copy.updated', refetchModels);
        };
    }, [projectSocket, queryOptions]);

    if (projectErrorMsg || organizationErrorMsg) {
        return (
            <ErrorScreen
                {...{
                    message: organizationErrorMsg ?? projectErrorMsg,
                    navigateTo: organizationErrorMsg ? `/home` : `/organizations/${organization?.id}`,
                }}
            />
        );
    }

    if (!project) {
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
            <div className={classes.nav}>
                <div>
                    <ProjectNavigation {...{ project, refetch: refetchProject, refetchProjects }} />
                </div>
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
    nav: {
        height: 32,
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: theme.spacing(2.125),
    },
}));

export default ModelsScreen;
