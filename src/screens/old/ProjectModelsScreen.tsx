import { makeStyles } from 'tss-react/mui';
import { FC, useEffect, useState } from 'react';
import { Alert, Card, Grid, Skeleton } from '@mui/material';
import { useTools } from '@intractinc/base/contexts/ToolsContext';
import useMeta from '@intractinc/base/hooks/useMeta';
import { useParams } from 'react-router-dom';
import ErrorScreen from '@/screens/error/ErrorScreen';
import Holding from '@intractinc/base/layout/Holding';
import OrganizationTierChip from '@intractinc/base/components/Organizations/OrganizationTierChip';
import { useGetProjectAdminQuery } from '@intractinc/base/redux/features/adminProject';
import { useGetAssetsAdminMutation } from '@intractinc/base/redux/features/adminAsset';
import AssetCard from '@intractinc/base/components/Assets/AssetCard';
import PublicChip from '@intractinc/base/layout/navbar/PublicChip';
import ProjectNav from '@intractinc/base/components/Projects/ProjectNavigation';

const ProjectModelsScreen: FC = () => {
    const { classes } = useStyles();
    const { projectId } = useParams() as { projectId: string };
    const [assets, setAssets] = useState<Asset[] | null>(null);
    const [getAssets, getAssetsState] = useGetAssetsAdminMutation();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const { updateBreadcrumbs, updateTabTitle } = useTools();
    const {
        data: project,
        error,
        isLoading,
        refetch,
    } = useGetProjectAdminQuery(
        { projectId },
        {
            refetchOnMountOrArgChange: true,
        }
    );

    const { nav, queryOptions, handleTagChipClicked } = useMeta(getAssets, getAssetsState, {
        skip: !project,
        include: 'tags',
        queryStrings: { 'filter[project]': projectId },
    });

    const refetchModels = () => getAssets({ options: queryOptions });

    useEffect(() => {
        getAssetsState.data?.data && setAssets(getAssetsState.data.data);
    }, [getAssetsState]);

    useEffect(() => {
        if (!project || !project.organization) {
            updateBreadcrumbs([
                { name: 'Admin', uri: '/admin' },
                { name: 'Organizations', uri: '/admin/organizations' },
                { skeleton: true },
                { skeleton: true },
                { name: 'Models' },
            ]);
            return;
        }

        updateBreadcrumbs([
            { name: 'Admin', uri: '/admin' },
            { name: 'Organizations', uri: '/admin/organizations' },
            {
                type: 'organization',
                name: project.organization.name,
                uri: `/admin/organizations/${project.organization_id}`,
                avatar: project.organization.avatar_route,
                chip: <OrganizationTierChip {...{ organization: project.organization }} />,
            },
            {
                type: 'project',
                name: project.name,
                uri: `/admin/projects/${project.id}`,
                avatar: project.avatar_route,
                chip: project.is_published ? <PublicChip /> : undefined,
            },
            { name: 'Models' },
        ]);
        updateTabTitle(project.name);
    }, [project]);

    useEffect(() => {
        if (error) {
            const response = error as NotFoundError;
            setErrorMessage(response.data.message);
        }
    }, [error]);

    if (errorMessage) {
        return <ErrorScreen message={errorMessage} />;
    }

    if (!project || !project.organization || isLoading) {
        return <Holding />;
    }

    return (
        <div className={classes.root}>
            <div className={classes.nav}>
                <ProjectNav {...{ project, refetch, redirectOnArchive: true }} />
                {nav()}
            </div>
            <Grid className={classes.container} container columns={15} alignItems={'top'}>
                {assets ? (
                    assets.length ? (
                        assets.map((asset) => (
                            <Grid key={`asset_${asset.id}`} item xs={15} sm={5} lg={3} p={2}>
                                <AssetCard
                                    key={`asset_card_${asset.id}`}
                                    {...{ asset, refetch: refetchModels, handleTagChipClicked, admin: true }}
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
    },
    nav: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: theme.spacing(2.125),
    },
}));

export default ProjectModelsScreen;
