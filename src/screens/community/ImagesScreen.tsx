import { makeStyles } from 'tss-react/mui';
import { useEffect, useState } from 'react';
import { Alert, Card, Grid, Skeleton } from '@mui/material';
import { useTools } from '@intractinc/base/contexts/ToolsContext';
import useMeta from '@intractinc/base/hooks/useMeta';
import { useGetTextureTagsQuery } from '@intractinc/base/redux/features/tag';
import { useGetTexturesMutation } from '@intractinc/base/redux/features/texture';
import TextureCard from '@intractinc/base/components/Textures/TextureCard';

const ImagesScreen = () => {
    const { classes } = useStyles();
    const [getTextures, getTexturesState] = useGetTexturesMutation();
    const textureTags = useGetTextureTagsQuery(null);
    const [textures, setTextures] = useState<Texture[] | null>(null);
    const { updateBreadcrumbs, updateTabTitle } = useTools();

    const { nav, queryOptions, handleTagChipClicked } = useMeta(getTextures, getTexturesState, {
        include: 'tags',
        tags: textureTags,
        useTrashed: false,
        sortSize: true,
    });

    const refetchTextures = () => getTextures({ options: queryOptions });

    useEffect(() => {
        getTexturesState.data?.data && setTextures(getTexturesState.data.data);
    }, [getTexturesState]);

    useEffect(() => {
        updateBreadcrumbs([{ name: 'Community', uri: '/community' }, { name: 'Images' }]);
        updateTabTitle('Community Images');
    }, [queryOptions]);

    return (
        <div className={classes.root}>
            <div className={classes.leftNav}>{nav()}</div>
            <Grid className={classes.container} container columns={15} alignItems={'top'}>
                {textures ? (
                    textures.length ? (
                        textures.map((texture) => (
                            <Grid key={`texture_${texture.id}`} item xs={15} sm={5} lg={3} p={2}>
                                <TextureCard {...{ texture, refetch: refetchTextures, handleTagChipClicked }} />
                            </Grid>
                        ))
                    ) : (
                        <Grid item xs={15}>
                            <Alert severity={'info'} style={{ width: 'auto' }}>
                                No images found.
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
    leftNav: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: theme.spacing(2.125),
    },
}));

export default ImagesScreen;
