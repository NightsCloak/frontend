import { useEffect, useState } from 'react';
import { useTools } from '@intractinc/base/contexts/ToolsContext';
import { useParams } from 'react-router-dom';
import { Grid, Paper } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import ErrorScreen from '@/screens/error/ErrorScreen';
import Holding from '@intractinc/base/layout/Holding';
import OrganizationTierChip from '@intractinc/base/components/Organizations/OrganizationTierChip';
import PublicChip from '@intractinc/base/layout/navbar/PublicChip';
import Comments from '@intractinc/base/components/Reviews/Comments/Comments';
import ReviewStatusChip from '@intractinc/base/components/Reviews/ReviewStatusChip';
import Reviewers from '@intractinc/base/components/Reviews/Reviewers';
import queryFilterOptions from '@intractinc/base/components/queryFilterOptions';
import { useGetReviewAdminMutation } from '@intractinc/base/redux/features/adminReview';
import AssetCard from '@intractinc/base/components/Assets/AssetCard';
import AuditsModal from '@intractinc/base/components/Admin/AuditsModal';
import ProjectNav from '@intractinc/base/components/Projects/ProjectNavigation';
import ReviewerProvider from '@intractinc/base/providers/ReviewerProvider';

const ProjectReviewScreen = () => {
    const { classes } = useStyles();
    const { reviewId } = useParams() as { reviewId: string };
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
    const { updateTabTitle, updateBreadcrumbs } = useTools();
    const [getReview, { data: review, error, isLoading }] = useGetReviewAdminMutation();

    const refetchReview = () =>
        getReview({
            reviewId,
            options: queryFilterOptions({ load: 'project.organization,user,reviewedBy,reviewable,reviewers.user' }),
        });

    useEffect(() => {
        if (error) {
            const response = error as NotFoundError;
            setErrorMessage(response.data.message);
        }
    }, [error]);

    useEffect(() => {
        refetchReview();
    }, []);

    useEffect(() => {
        if (!review || !review.project || !review.project.organization) {
            updateBreadcrumbs([
                { name: 'Admin', uri: '/admin' },
                { name: 'Organizations', uri: '/admin/organizations' },
                { skeleton: true },
                { skeleton: true },
                { name: 'Reviews' },
                { skeleton: true },
            ]);
            return;
        }

        updateBreadcrumbs([
            { name: 'Admin', uri: '/admin' },
            { name: 'Organizations', uri: '/admin/organizations' },
            {
                type: 'organization',
                name: review.project.organization.name,
                uri: `/admin/organizations/${review.project.organization_id}`,
                avatar: review.project.organization.avatar_route,
                chip: <OrganizationTierChip {...{ organization: review.project.organization }} />,
            },
            {
                type: 'project',
                name: review.project.name,
                uri: `/admin/projects/${review.project_id}`,
                avatar: review.project.avatar_route,
                chip: review.project.is_published ? <PublicChip /> : undefined,
            },
            { name: 'Reviews', uri: `/admin/projects/${review.project_id}/reviews` },
            {
                name: review.name,
                chip: <ReviewStatusChip {...{ review }} />,
            },
        ]);
        updateTabTitle(review.name);
    }, [review]);

    if (errorMessage) {
        return <ErrorScreen message={errorMessage} />;
    }

    if (!review || !review.project || isLoading) {
        return <Holding />;
    }

    return (
        <div className={classes.root}>
            <ReviewerProvider {...{ review, project: review.project, fetchReview: refetchReview, admin: true }}>
                <div className={classes.nav}>
                    <ProjectNav
                        {...{
                            project: review.project,
                            refetch: refetchReview,
                            redirectOnArchive: true,
                            nodes: [
                                <AuditsModal key={'aud'} {...{ auditable: review }} />,
                                <ReviewStatusChip key={'status'} {...{ review, medium: true }} />,
                            ],
                        }}
                    />
                    <Reviewers />
                </div>
                <Grid className={classes.split} container>
                    <Grid item component={Paper} elevation={0} className={classes.leftSection}>
                        <Comments />
                    </Grid>
                    <Grid item component={Paper} elevation={0} className={classes.rightSection}>
                        {review.reviewable && (
                            <Grid item width={500}>
                                <AssetCard
                                    key={`asset_card_${review.reviewable.id}`}
                                    {...{
                                        asset: review.reviewable,
                                        refetch: () => {},
                                        handleTagChipClicked: () => {},
                                        admin: true,
                                    }}
                                />
                            </Grid>
                        )}
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

export default ProjectReviewScreen;
