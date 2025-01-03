import { useEffect, useState } from 'react';
import { useTools } from '@intractinc/base/contexts/ToolsContext';
import { useParams } from 'react-router-dom';
import { Divider, Grid, Paper, Stack } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import ErrorScreen from '@/screens/error/ErrorScreen';
import Holding from '@intractinc/base/layout/Holding';
import OrganizationTierChip from '@intractinc/base/components/Organizations/OrganizationTierChip';
import PublicChip from '@intractinc/base/layout/navbar/PublicChip';
import { useGetReviewQuery } from '@intractinc/base/redux/features/review';
import Comments from '@intractinc/base/components/Reviews/Comments/Comments';
import { useEcho } from '@intractinc/base/contexts/EchoContext';
import { Channel } from 'laravel-echo/dist/channel';
import ReviewMenu from '@intractinc/base/components/Reviews/ReviewMenu';
import ReviewStatusChip from '@intractinc/base/components/Reviews/ReviewStatusChip';
import ManageReviewStatus from '@intractinc/base/components/Reviews/ManageReviewStatus';
import Reviewers from '@intractinc/base/components/Reviews/Reviewers';
import ReviewableAssetViewer from '@intractinc/base/components/Reviews/ReviewableAssetViewer';
import queryFilterOptions from '@intractinc/base/components/queryFilterOptions';
import { useWorkspace } from '@intractinc/base/contexts/WorkspaceContext';
import ReviewerProvider from '@intractinc/base/providers/ReviewerProvider';

const ReviewScreen = () => {
    const { organization, organizationErrorMsg, project, projectErrorMsg } = useWorkspace();
    const { classes } = useStyles();
    const { reviewId } = useParams() as { reviewId: string };
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
    const { updateTabTitle, updateBreadcrumbs } = useTools();
    const [socket, setSocket] = useState<Channel | null>(null);
    const { echo } = useEcho();
    const {
        data: review,
        error,
        refetch: fetchReview,
    } = useGetReviewQuery(
        {
            projectId: project?.id ?? '',
            reviewId,
            options: queryFilterOptions({ load: 'user,reviewedBy,reviewable,reviewers.user' }),
        },
        {
            skip: !project,
            refetchOnMountOrArgChange: true,
        }
    );

    useEffect(() => {
        if (error) {
            const response = error as NotFoundError;
            setErrorMessage(response.data.message);
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
                uri: `/organizations/${organization?.id}/projects/${project?.id}`,
                chip: project?.is_published ? <PublicChip /> : undefined,
            },
            {
                skeleton: !project,
                name: 'Reviews',
                uri: `/organizations/${organization?.id}/projects/${project?.id}/reviews`,
            },
            {
                skeleton: !review,
                name: review?.name,
                chip: review && <ReviewStatusChip {...{ review }} />,
            },
        ]);

        if (!project || !review) {
            return;
        }

        updateTabTitle(`${project.name} - ${review.name}`);
    }, [review, project]);

    useEffect(() => {
        if (!echo || !review) {
            return;
        }

        if (!socket) {
            setSocket(echo.private(`intract.review.${review.id}`));
            return;
        }

        socket.listen('.review.updated', fetchReview).listen('.review.archived', fetchReview);

        return () => {
            if (echo && socket) {
                socket.stopListening('.review.updated', fetchReview).stopListening('.review.archived', fetchReview);
                echo.leave(`intract.review.${review.id}`);
                setSocket(null);
            }
        };
    }, [echo, socket, review?.id]);

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

    if (!project || !review) {
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
            <ReviewerProvider {...{ review, project, fetchReview, socket, member: project.member }}>
                <div className={classes.nav}>
                    <Stack
                        spacing={1}
                        direction={'row'}
                        alignItems={'center'}
                        divider={<Divider orientation={'vertical'} flexItem />}
                    >
                        {!review.reviewable?.is_approved && (
                            <ReviewMenu
                                {...{
                                    project,
                                    review,
                                    refetch: fetchReview,
                                    member: project.member,
                                    redirectOnArchive: true,
                                }}
                            />
                        )}
                        <ManageReviewStatus {...{ review, member: project.member, success: fetchReview }} />
                    </Stack>
                    <Reviewers />
                </div>
                <Grid className={classes.split} container>
                    <Grid item component={Paper} elevation={0} className={classes.leftSection}>
                        <Comments />
                    </Grid>
                    <Grid item component={Paper} elevation={0} className={classes.rightSection}>
                        {review.reviewable && <ReviewableAssetViewer />}
                    </Grid>
                </Grid>
            </ReviewerProvider>
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
    split: {
        height: '100%',
        overflow: 'hidden',
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(2),
        [theme.breakpoints.down('xl')]: {
            flexDirection: 'column',
            paddingRight: theme.spacing(1),
        },
    },
    nav: {
        height: 32,
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(2),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: theme.spacing(2.125),
        marginRight: theme.spacing(2.125),
    },
    leftSection: {
        width: 600,
        height: '100%',
        overflowY: 'auto',
        transition: `max-height 300ms ease-in-out`,
        '&::-webkit-scrollbar': {
            width: 8,
        },
        scrollbarWidth: 'thin',
        padding: theme.spacing(2),
        marginRight: theme.spacing(1),
        [theme.breakpoints.down('xl')]: {
            height: 475,
            width: '100%',
            marginBottom: theme.spacing(1),
        },
    },
    rightSection: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        transition: `max-height 300ms ease-in-out`,
        '&::-webkit-scrollbar': {
            width: 8,
        },
        scrollbarWidth: 'thin',
        width: '100%',
        padding: theme.spacing(2),
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        [theme.breakpoints.up('xl')]: {
            height: '100%',
        },
        [theme.breakpoints.down('xl')]: {
            marginLeft: 0,
        },
    },
}));

export default ReviewScreen;
