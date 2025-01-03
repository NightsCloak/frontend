import { useEffect, useState } from 'react';
import { useTools } from '@intractinc/base/contexts/ToolsContext';
import { useParams } from 'react-router-dom';
import { Alert, Card, Grid, Skeleton } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import useMeta from '@intractinc/base/hooks/useMeta';
import {
    useGetCommunityProjectAssetsMutation,
    useGetCommunityProjectQuery,
} from '@intractinc/base/redux/features/community';
import ErrorScreen from '@/screens/error/ErrorScreen';
import Holding from '@intractinc/base/layout/Holding';
import AssetCard from '@intractinc/base/components/Assets/AssetCard';

const ProjectScreen = () => {
    const { classes } = useStyles();
    const { projectId } = useParams() as { projectId: string };
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
    const [assets, setAssets] = useState<Asset[] | null>(null);
    const [getModels, getAssetsState] = useGetCommunityProjectAssetsMutation();
    // const assetTags = useGetAssetTagsQuery(null);
    const { updateBreadcrumbs, updateTabTitle } = useTools();
    const {
        data: project,
        error,
        isLoading,
    } = useGetCommunityProjectQuery(
        { projectId: projectId },
        {
            refetchOnMountOrArgChange: true,
        }
    );
    const { nav, handleTagChipClicked } = useMeta(getModels, getAssetsState, {
        skip: !project,
        triggerParams: project && { projectId: project.id },
        // include: 'tags',
        // tags: assetTags,
        useTrashed: false,
    });

    useEffect(() => {
        if (error) {
            const response = error as NotFoundError;
            setErrorMessage(response.data.message);
        }
    }, [error]);

    useEffect(() => {
        if (!project) {
            updateBreadcrumbs([
                { name: 'Community', uri: '/community' },
                { name: 'Projects', uri: '/community/projects' },
                { skeleton: true },
            ]);

            return;
        }

        updateBreadcrumbs([
            { name: 'Community', uri: '/community' },
            { name: 'Projects', uri: '/community/projects' },
            {
                type: 'project',
                name: project.name,
                avatar: project.avatar_route,
            },
        ]);
        updateTabTitle(project.name);
    }, [project]);

    useEffect(() => {
        getAssetsState.data?.data && setAssets(getAssetsState.data.data);
    }, [getAssetsState]);

    if (error) {
        return <ErrorScreen message={errorMessage} />;
    }

    if (isLoading || !project) {
        return <Holding />;
    }

    return (
        <div className={classes.root}>
            {nav()}
            <Grid className={classes.container} container columns={15} alignItems={'top'}>
                {assets ? (
                    assets.length ? (
                        assets.map((asset) => (
                            <Grid key={`asset_${asset.id}`} item xs={15} sm={5} lg={3} p={2}>
                                <AssetCard
                                    key={`asset_card_${asset.id}`}
                                    {...{
                                        asset,
                                        communityProject: project,
                                        refetch: () => {},
                                        handleTagChipClicked,
                                    }}
                                />
                            </Grid>
                        ))
                    ) : (
                        <Grid item xs={15}>
                            <Alert severity={'info'} style={{ width: 'auto' }}>
                                No models available.
                            </Alert>
                        </Grid>
                    )
                ) : (
                    [...Array(15)].map((_el, i) => (
                        <Grid key={i} item xs={15} sm={5} lg={3} p={2}>
                            <Card elevation={0}>
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

const useStyles = makeStyles()((_theme) => ({
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
}));

export default ProjectScreen;
