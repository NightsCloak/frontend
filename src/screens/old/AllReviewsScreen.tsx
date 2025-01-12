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
import { useGetReviewsAdminMutation } from '@intractinc/base/redux/features/adminReview';
import ReviewListItem from '@intractinc/base/components/Reviews/ReviewListItem';

const AllReviewsScreen: FC = () => {
    const { classes } = useStyles();
    const [reviews, setReviews] = useState<Review[] | null>(null);
    const [getReviews, getReviewsState] = useGetReviewsAdminMutation();
    const { updateBreadcrumbs, updateTabTitle } = useTools();

    const { nav, queryOptions } = useMeta(getReviews, getReviewsState, {
        include: 'latestComment.user,latestComment.mentions,reviewable,user',
    });

    const refetchReviews = () => getReviews({ options: queryOptions });

    useEffect(() => {
        getReviewsState.data?.data && setReviews(getReviewsState.data.data);
    }, [getReviewsState]);

    useEffect(() => {
        updateBreadcrumbs([{ name: 'Admin', uri: '/admin' }, { name: 'Reviews' }]);
        updateTabTitle('Reviews');
    }, []);

    return (
        <div className={classes.root}>
            {nav()}
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
}));

export default AllReviewsScreen;
