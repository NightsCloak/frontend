import { makeStyles } from 'tss-react/mui';
import { useEffect, useState } from 'react';
import {
    Alert,
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
import ErrorScreen from '@/screens/error/ErrorScreen';
import Holding from '@intractinc/base/layout/Holding';
import OrganizationTierChip from '@intractinc/base/components/Organizations/OrganizationTierChip';
import PublicChip from '@intractinc/base/layout/navbar/PublicChip';
import { useGetReviewsMutation } from '@intractinc/base/redux/features/review';
import { AutoDelete } from '@mui/icons-material';
import ReviewListItem from '@intractinc/base/components/Reviews/ReviewListItem';
import { useWorkspace } from '@intractinc/base/contexts/WorkspaceContext';
import EmptyReviewsTrash from '@intractinc/base/components/Projects/EmptyReviewsTrash';

const TrashedReviewsScreen = () => {
    const { organization, organizationErrorMsg, project, workspaceProjectId, projectSocket, projectErrorMsg } =
        useWorkspace();
    const { classes } = useStyles();
    const [getReviews, getReviewsState] = useGetReviewsMutation();
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
    const { updateTools, updateBreadcrumbs, updateTabTitle } = useTools();
    const [reviews, setReviews] = useState<Review[] | null>(null);

    const { nav, queryOptions } = useMeta(getReviews, getReviewsState, {
        skip: !project || project.id !== workspaceProjectId,
        triggerParams: project && { projectId: project.id },
        include: 'latestComment.user,latestComment.mentions,reviewable,user',
        useTrashed: false,
        queryStrings: { 'filter[trashed]': 'only' },
    });

    const refetchReviews = () => getReviews({ projectId: project?.id ?? '', options: queryOptions });

    useEffect(() => {
        getReviewsState.reset();
        setReviews(null);
    }, [workspaceProjectId]);

    useEffect(() => {
        getReviewsState.data?.data && setReviews(getReviewsState.data.data);
    }, [getReviewsState]);

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
            { name: 'Reviews' },
        ]);

        if (!project) {
            return;
        }

        updateTabTitle(`${project.name} - Trash - Reviews`);

        updateTools([
            <EmptyReviewsTrash
                key={'empty_reviews_trash'}
                {...{ project, member: project.member, large: true, onSuccess: refetchReviews }}
            />,
        ]);
    }, [project, queryOptions]);

    useEffect(() => {
        if (getReviewsState.error) {
            const response = getReviewsState.error as NotFoundError;
            setErrorMessage(response.data.message);
        }
    }, [getReviewsState.error]);

    useEffect(() => {
        projectSocket &&
            projectSocket
                .listen('.review.purged', refetchReviews)
                .listen('.review.archived', refetchReviews)
                .listen('.review.restored', refetchReviews);
        return () => {
            projectSocket &&
                projectSocket
                    .stopListening('.review.purged', refetchReviews)
                    .stopListening('.review.archived', refetchReviews)
                    .stopListening('.review.restored', refetchReviews);
        };
    }, [projectSocket, queryOptions]);

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
                            Reviews that have been in trash for more than 7 days will be deleted forever.
                        </Typography>
                    </Alert>
                </div>
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
                                    <ReviewListItem
                                        {...{ project, review, refetch: refetchReviews, member: project.member }}
                                    />
                                    {i + 1 !== reviews.length && <Divider variant={'inset'} component={'li'} />}
                                </div>
                            ))
                        ) : (
                            <ListItem>
                                <ListItemText
                                    sx={{ display: 'flex', justifyContent: 'center' }}
                                    primary={<Typography variant={'h6'}>No reviews in trash found.</Typography>}
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
        height: 32,
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: theme.spacing(2.125),
    },
}));

export default TrashedReviewsScreen;
