import { makeStyles } from 'tss-react/mui';
import { useEffect, useState } from 'react';
import { Alert, Card, Grid, Skeleton, Typography } from '@mui/material';
import { useTools } from '@intractinc/base/contexts/ToolsContext';
import useMeta from '@intractinc/base/hooks/useMeta';
import { useGetAssetCollectionsMutation } from '@intractinc/base/redux/features/assetCollection';
import ErrorScreen from '@/screens/error/ErrorScreen';
import Holding from '@intractinc/base/layout/Holding';
import { AutoDelete } from '@mui/icons-material';
import AssetCollectionCard from '@intractinc/base/components/AssetCollections/AssetCollectionCard';
import OrganizationTierChip from '@intractinc/base/components/Organizations/OrganizationTierChip';
import PublicChip from '@intractinc/base/layout/navbar/PublicChip';
import { useWorkspace } from '@intractinc/base/contexts/WorkspaceContext';
import EmptyAssetCollectionsTrash from '@intractinc/base/components/Projects/EmptyAssetCollectionsTrash';

const TrashedModelCollectionsScreen = () => {
    const { organization, organizationErrorMsg, project, workspaceProjectId, projectSocket, projectErrorMsg } =
        useWorkspace();
    const { classes } = useStyles();
    const [getCollections, getCollectionsState] = useGetAssetCollectionsMutation();
    const { updateTools, updateBreadcrumbs, updateTabTitle } = useTools();
    const [collections, setCollections] = useState<AssetCollection[] | null>(null);

    const { nav, queryOptions } = useMeta(getCollections, getCollectionsState, {
        skip: !project || project.id !== workspaceProjectId,
        triggerParams: project && { projectId: project.id },
        useTrashed: false,
        queryStrings: { 'filter[trashed]': 'only' },
    });

    const refetchCollections = () => getCollections({ projectId: project?.id ?? '', options: queryOptions });

    useEffect(() => {
        getCollectionsState.reset();
        setCollections(null);
    }, [workspaceProjectId]);

    useEffect(() => {
        getCollectionsState.data?.data && setCollections(getCollectionsState.data.data);
    }, [getCollectionsState]);

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
            { name: 'Trash', uri: `/organizations/${organization?.id}/projects/${project?.id}/trash` },
            { name: 'Folders' },
        ]);

        if (!project) {
            return;
        }

        updateTabTitle(`${project.name} - Trash - Folders`);

        updateTools([
            <EmptyAssetCollectionsTrash
                key={'empty_asset_collections_trash'}
                {...{ project, member: project.member, large: true, onSuccess: refetchCollections }}
            />,
        ]);
    }, [project, queryOptions]);

    useEffect(() => {
        projectSocket &&
            projectSocket
                .listen('.asset.collection.purged', refetchCollections)
                .listen('.asset.collection.archived', refetchCollections)
                .listen('.asset.collection.restored', refetchCollections);
        return () => {
            projectSocket &&
                projectSocket
                    .stopListening('.asset.collection.purged', refetchCollections)
                    .stopListening('.asset.collection.archived', refetchCollections)
                    .stopListening('.asset.collection.restored', refetchCollections);
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
                    <Alert icon={<AutoDelete />} severity={'warning'} style={{ width: 'auto' }}>
                        <Typography noWrap={true}>
                            Folders that have been in trash for more than 7 days will be deleted forever.
                        </Typography>
                    </Alert>
                </div>
                {nav()}
            </div>
            <Grid className={classes.container} container columns={15} alignItems={'top'}>
                {collections ? (
                    collections.length ? (
                        collections.map((collection) => (
                            <Grid key={`collection_${collection.id}`} item xs={15} sm={5} lg={3} p={2}>
                                <AssetCollectionCard
                                    {...{
                                        project,
                                        collection,
                                        refetch: refetchCollections,
                                        member: project.member,
                                        orgId: project.organization_id,
                                    }}
                                />
                            </Grid>
                        ))
                    ) : (
                        <Grid item xs={15}>
                            <Alert severity={'info'} style={{ width: 'auto' }}>
                                No folders in trash found.
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

export default TrashedModelCollectionsScreen;
