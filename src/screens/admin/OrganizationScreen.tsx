import { makeStyles } from 'tss-react/mui';
import { FC, useEffect, useState } from 'react';
import { Alert, Card, Divider, Grid, Skeleton, Stack } from '@mui/material';
import { useTools } from '@intractinc/base/contexts/ToolsContext';
import useMeta from '@intractinc/base/hooks/useMeta';
import { useParams } from 'react-router-dom';
import ErrorScreen from '@/screens/error/ErrorScreen';
import Holding from '@intractinc/base/layout/Holding';
import { useGetOrganizationAdminQuery } from '@intractinc/base/redux/features/adminOrganization';
import OrganizationTierChip from '@intractinc/base/components/Organizations/OrganizationTierChip';
import { useGetProjectsAdminMutation } from '@intractinc/base/redux/features/adminProject';
import ProjectCard from '@intractinc/base/components/Projects/ProjectCard';
import OrganizationStorageBar from '@intractinc/base/components/Organizations/OrganizationStorageBar';
import OrganizationMembersModal from '@intractinc/base/components/Admin/Organizations/OrganizationMembersModal';
import OrganizationSubscriptionChip from '@intractinc/base/components/Billing/Organization/OrganizationSubscriptionChip';
import OrganizationMenu from '@intractinc/base/components/Admin/Organizations/OrganizationMenu';

const OrganizationScreen: FC = () => {
    const { classes } = useStyles();
    const { orgId } = useParams() as { orgId: string };
    const [projects, setProjects] = useState<Project[] | null>(null);
    const [getProjects, getProjectsState] = useGetProjectsAdminMutation();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const { updateBreadcrumbs, updateTabTitle } = useTools();
    const {
        data: organization,
        error,
        isLoading,
        refetch,
    } = useGetOrganizationAdminQuery(
        { orgId },
        {
            refetchOnMountOrArgChange: true,
        }
    );

    const { nav, queryOptions, handleTagChipClicked } = useMeta(getProjects, getProjectsState, {
        skip: !organization,
        include: 'membersCount,assetsCount,assetCollectionsCount',
        queryStrings: { 'filter[organization]': orgId },
    });

    const refetchProjects = () => getProjects({ options: queryOptions });

    useEffect(() => {
        getProjectsState.data?.data && setProjects(getProjectsState.data.data);
    }, [getProjectsState]);

    useEffect(() => {
        if (!organization) {
            updateBreadcrumbs([
                { name: 'Admin', uri: '/admin' },
                { name: 'Organizations', uri: '/admin/organizations' },
                { skeleton: true },
            ]);
            return;
        }

        updateBreadcrumbs([
            { name: 'Admin', uri: '/admin' },
            { name: 'Organizations', uri: '/admin/organizations' },
            {
                type: 'organization',
                name: organization.name,
                avatar: organization.avatar_route,
                chip: <OrganizationTierChip {...{ organization }} />,
            },
        ]);
        updateTabTitle(organization.name);
    }, [organization]);

    useEffect(() => {
        if (error) {
            const response = error as NotFoundError;
            setErrorMessage(response.data.message);
        }
    }, [error]);

    if (errorMessage) {
        return <ErrorScreen message={errorMessage} />;
    }

    if (!organization || isLoading) {
        return <Holding />;
    }

    return (
        <div className={classes.root}>
            <div className={classes.nav}>
                <Stack
                    spacing={1}
                    direction={'row'}
                    alignItems={'center'}
                    divider={<Divider orientation={'vertical'} flexItem />}
                >
                    <OrganizationMenu {...{ organization, refetch, redirectOnArchive: true }} />
                    <OrganizationMembersModal {...{ organization }} />
                    <OrganizationStorageBar {...{ organization }} />
                    <OrganizationSubscriptionChip
                        {...{ subscription: organization.current_subscription, medium: true }}
                    />
                </Stack>
                {nav()}
            </div>
            <Grid className={classes.container} container columns={15} alignItems={'top'}>
                {projects ? (
                    projects.length ? (
                        projects.map((project) => (
                            <Grid key={`asset_${project.id}`} item xs={15} sm={5} lg={3} p={2}>
                                <ProjectCard
                                    key={`project_card_${project.id}`}
                                    {...{ project, refetch: refetchProjects, handleTagChipClicked, admin: true }}
                                />
                            </Grid>
                        ))
                    ) : (
                        <Grid item xs={15}>
                            <Alert severity={'info'} style={{ width: 'auto' }}>
                                No projects found.
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

export default OrganizationScreen;
