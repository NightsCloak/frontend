import { useGetUserTexturesMutation } from '@intractinc/base/redux/features/userTexture';
import { makeStyles } from 'tss-react/mui';
import { useEffect, useState } from 'react';
import { Alert, Button, Card, Divider, Grid, Link, Skeleton, Stack } from '@mui/material';
import { useTools } from '@intractinc/base/contexts/ToolsContext';
import useMeta from '@intractinc/base/hooks/useMeta';
import StoreUserTexture from '@intractinc/base/components/UserTextures/StoreUserTexture';
import { Collections, SmartToy } from '@mui/icons-material';
import { useGetTextureTagsQuery } from '@intractinc/base/redux/features/tag';
import UserTextureCard from '@intractinc/base/components/UserTextures/UserTextureCard';
import { Link as RouterLink } from 'react-router-dom';

const ImagesScreen = () => {
    const { classes } = useStyles();
    const [getTextures, getTexturesState] = useGetUserTexturesMutation();
    const textureTags = useGetTextureTagsQuery(null);
    const [textures, setTextures] = useState<UserTexture[] | null>(null);
    const { updateTools, updateBreadcrumbs, updateTabTitle } = useTools();

    const { nav, queryOptions, handleTagChipClicked } = useMeta(getTextures, getTexturesState, {
        include: 'tags',
        tags: textureTags,
        sortSize: true,
        useTrashed: false,
    });

    const refetchTextures = () => getTextures({ options: queryOptions });

    useEffect(() => {
        getTexturesState.data?.data && setTextures(getTexturesState.data.data);
    }, [getTexturesState]);

    useEffect(() => {
        updateBreadcrumbs([{ name: 'Images' }]);
        updateTabTitle('Images');
        updateTools([<StoreUserTexture key={'store_user_texture'} {...{ onSuccess: refetchTextures }} />]);
    }, [queryOptions]);

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
                        to={'/home/ai-images'}
                        sx={(theme) => ({ color: theme.palette.text.primary, textDecoration: 'none' })}
                    >
                        <Button
                            sx={{ width: 129 }}
                            startIcon={<SmartToy />}
                            color={'inherit'}
                            variant={'text'}
                            aria-label={'A.I. Images'}
                        >
                            A. I. Images
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
                {textures ? (
                    textures.length ? (
                        textures.map((texture) => (
                            <Grid key={`texture_${texture.id}`} item xs={15} sm={5} lg={3} p={2}>
                                <UserTextureCard {...{ texture, refetch: refetchTextures, handleTagChipClicked }} />
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
