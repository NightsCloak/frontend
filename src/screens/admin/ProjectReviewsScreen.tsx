import { makeStyles } from 'tss-react/mui';
import { FC, useEffect, useState } from 'react';
import {
    Avatar,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Skeleton,
    Typography,
} from '@mui/material';
import { useTools } from '@intractinc/base/contexts/ToolsContext';
import useMeta from '@intractinc/base/hooks/useMeta';
import { useParams } from 'react-router-dom';
import ErrorScreen from '@/screens/error/ErrorScreen';
import Holding from '@intractinc/base/layout/Holding';
import OrganizationTierChip from '@intractinc/base/components/Organizations/OrganizationTierChip';
import { useGetProjectAdminQuery } from '@intractinc/base/redux/features/adminProject';
import PublicChip from '@intractinc/base/layout/navbar/PublicChip';
import ProjectNav from '@intractinc/base/components/Projects/ProjectNavigation';
import { useGetReviewsAdminMutation } from '@intractinc/base/redux/features/adminReview';
import ReviewListItem from '@intractinc/base/components/Reviews/ReviewListItem';

const ProjectReviewsScreen: FC = () => {
    const { classes } = useStyles();
    const { projectId } = useParams() as { projectId: string };
    const [reviews, setReviews] = useState<Review[] | null>(null);
    const [getReviews, getReviewsState] = useGetReviewsAdminMutation();
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

    const { nav, queryOptions } = useMeta(getReviews, getReviewsState, {
        skip: !project,
        include: 'latestComment.user,latestComment.mentions,reviewable,user',
        queryStrings: { 'filter[project]': projectId },
    });

    const refetchReviews = () => getReviews({ options: queryOptions });

    useEffect(() => {
        getReviewsState.data?.data && setReviews(getReviewsState.data.data);
    }, [getReviewsState]);

    useEffect(() => {
        if (!project || !project.organization) {
            updateBreadcrumbs([
                { name: 'Admin', uri: '/admin' },
                { name: 'Organizations', uri: '/admin/organizations' },
                { skeleton: true },
                { skeleton: true },
                { name: 'Reviews' },
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
            { name: 'Reviews' },
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
            <Grid className={classes.container} container>
                <Grid item xs={12} sm={10} md={8}>
                    <List sx={{ width: '100%', bgcolor: 'background.paper', paddingY: 0 }}>
                        {!reviews ? (
                            [...Array(10)].map((el, i) => (
                                <div key={i}>
                                    <ListItem alignItems={'flex-start'}>
                                        <ListItemAvatar>
                                            <Skeleton variant={'circular'}>
                                                <Avatar />
                                            </Skeleton>
                                        </ListItemAvatar>
                                        <Skeleton
                                            style={{ flexGrow: 1 }}
                                            animation={'wave'}
                                            variant={'rectangular'}
                                            height={75}
                                        />
                                    </ListItem>
                                    {i + 1 !== 10 && <Divider variant={'inset'} component={'li'} />}
                                </div>
                            ))
                        ) : reviews.length > 0 ? (
                            reviews.map((review, i) => (
                                <div key={review.id}>
                                    <ReviewListItem {...{ review, refetch: refetchReviews, admin: true }} />
                                    {i + 1 !== reviews.length && <Divider variant={'inset'} component={'li'} />}
                                </div>
                            ))
                        ) : (
                            <ListItem>
                                <ListItemText
                                    sx={{ display: 'flex', justifyContent: 'center' }}
                                    primary={<Typography variant={'h6'}>No reviews found.</Typography>}
                                />
                            </ListItem>
                        )}
                    </List>
                </Grid>
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
        justifyContent: 'center',
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
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: theme.spacing(2.125),
    },
}));

export default ProjectReviewsScreen;
