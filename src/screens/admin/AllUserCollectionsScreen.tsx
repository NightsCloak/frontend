import { makeStyles } from 'tss-react/mui';
import { FC, useEffect, useState } from 'react';
import { Alert, Card, Grid, Skeleton } from '@mui/material';
import { useTools } from '@intractinc/base/contexts/ToolsContext';
import useMeta from '@intractinc/base/hooks/useMeta';
import { useGetUserAssetCollectionsAdminMutation } from '@intractinc/base/redux/features/adminUserAssetCollection';
import UserAssetCollectionCard from '@intractinc/base/components/UserAssetCollections/UserAssetCollectionCard';

const AllUserCollectionsScreen: FC = () => {
    const { classes } = useStyles();
    const [collections, setCollections] = useState<UserAssetCollection[] | null>(null);
    const [getCollections, getCollectionsState] = useGetUserAssetCollectionsAdminMutation();
    const { updateBreadcrumbs, updateTabTitle } = useTools();

    const { nav, queryOptions, handleTagChipClicked } = useMeta(getCollections, getCollectionsState, {
        include: 'assetsCount',
    });

    const refetchCollections = () => getCollections({ options: queryOptions });

    useEffect(() => {
        getCollectionsState.data?.data && setCollections(getCollectionsState.data.data);
    }, [getCollectionsState]);

    useEffect(() => {
        updateBreadcrumbs([{ name: 'Admin', uri: '/admin' }, { name: 'User Folders' }]);
        updateTabTitle('User Folders');
    }, []);

    return (
        <div className={classes.root}>
            {nav()}
            <Grid className={classes.container} container columns={15} alignItems={'top'}>
                {collections ? (
                    collections.length ? (
                        collections.map((collection) => (
                            <Grid key={`collection_${collection.id}`} item xs={15} sm={5} lg={3} p={2}>
                                <UserAssetCollectionCard
                                    key={`collection_card_${collection.id}`}
                                    {...{ collection, refetch: refetchCollections, handleTagChipClicked, admin: true }}
                                />
                            </Grid>
                        ))
                    ) : (
                        <Grid item xs={15}>
                            <Alert severity={'info'} style={{ width: 'auto' }}>
                                No folders found.
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

const useStyles = makeStyles()(() => ({
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

export default AllUserCollectionsScreen;
