import { makeStyles } from 'tss-react/mui';
import { useEffect, useState } from 'react';
import { Alert, Button, Card, Divider, Grid, Link, Skeleton, Stack, Typography } from '@mui/material';
import { useTools } from '@intractinc/base/contexts/ToolsContext';
import useMeta from '@intractinc/base/hooks/useMeta';
import { AutoDelete, Collections, PhotoLibrary } from '@mui/icons-material';
import { useGetUserAiTexturesMutation } from '@intractinc/base/redux/features/aiTexture';
import { Link as RouterLink } from 'react-router-dom';
import { useGetTextureTagsQuery } from '@intractinc/base/redux/features/tag';
import AiTextureCard from '@intractinc/base/components/AiTextures/AiTextureCard';

const AiImagesScreen = () => {
    const { classes } = useStyles();
    const [getTextures, getTexturesState] = useGetUserAiTexturesMutation();
    const textureTags = useGetTextureTagsQuery(null);
    const [textures, setTextures] = useState<AiTexture[] | null>(null);
    const { updateBreadcrumbs, updateTabTitle } = useTools();

    const { nav, queryOptions, showTrashed, handleTagChipClicked } = useMeta(getTextures, getTexturesState, {
        include: 'tags',
        tags: textureTags,
        sortSize: true,
    });

    const refetchTextures = () => getTextures({ options: queryOptions });

    useEffect(() => {
        updateBreadcrumbs([{ name: 'A.I. Images' }]);
        updateTabTitle('A.I. Images');
    }, []);

    useEffect(() => {
        getTexturesState.data?.data && setTextures(getTexturesState.data.data);
    }, [getTexturesState]);

    return (
        <div className={classes.root}>
            <div className={classes.leftNav}>
                <Stack
                    spacing={1}
                    direction={'row'}
                    alignItems={'center'}
                    divider={<Divider orientation={'vertical'} flexItem />}
                >
                    <Link
                        component={RouterLink}
                        to={'/home/images'}
                        sx={(theme) => ({ color: theme.palette.text.primary, textDecoration: 'none' })}
                    >
                        <Button startIcon={<PhotoLibrary />} color={'inherit'} variant={'text'} aria-label={'Images'}>
                            Images
                        </Button>
                    </Link>
                    <Link
                        component={RouterLink}
                        to={'/community/images'}
                        sx={(theme) => ({ color: theme.palette.text.primary, textDecoration: 'none' })}
                    >
                        <Button
                            sx={{ width: 155 }}
                            startIcon={<Collections />}
                            color={'inherit'}
                            variant={'text'}
                            aria-label={'Public Images'}
                        >
                            Public Images
                        </Button>
                    </Link>
                </Stack>
                {nav()}
            </div>
            <Grid className={classes.container} container columns={15} alignItems={'top'}>
                {showTrashed && (
                    <Grid item xs={15}>
                        <Alert icon={<AutoDelete />} severity={'warning'} style={{ width: 'auto' }}>
                            <Typography>
                                A.I. Images that have been in trash for more than 7 days will be automatically deleted
                                forever.
                            </Typography>
                        </Alert>
                    </Grid>
                )}
                {textures ? (
                    textures.length ? (
                        textures.map((texture) => (
                            <Grid key={`ai_texture_${texture.id}`} item xs={15} sm={5} lg={3} p={2}>
                                <AiTextureCard {...{ texture, refetch: refetchTextures, handleTagChipClicked }} />
                            </Grid>
                        ))
                    ) : (
                        <Grid item xs={15}>
                            <Alert severity={'info'} style={{ width: 'auto' }}>
                                No A.I. images found.
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

export default AiImagesScreen;
