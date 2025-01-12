import {
    Grid,
    Paper,
    Skeleton,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { FC, useEffect, useState } from 'react';
import useMeta from '@intractinc/base/hooks/useMeta';
import ReactTimeAgo from 'react-timeago';
import useDateUtils from '@intractinc/base/hooks/useDateUtils';
import { useTools } from '@intractinc/base/contexts/ToolsContext';
import { useGetEnvironmentTexturesMutation } from '@intractinc/base/redux/features/environmentTexture';
import StoreEnvironmentTexture from '@intractinc/base/components/EnvironmentTextures/StoreEnvironmentTexture';
import PublishEnvironmentTexture from '@intractinc/base/components/EnvironmentTextures/PublishEnvironmentTexture';
import RenameEnvironmentTexture from '@intractinc/base/components/EnvironmentTextures/RenameEnvironmentTexture';
import DeleteEnvironmentTexture from '@intractinc/base/components/EnvironmentTextures/DeleteEnvironmentTexture';

const HDRIsScreen: FC = () => {
    const { classes } = useStyles();
    const [textures, setTextures] = useState<EnvironmentTexture[] | null>(null);
    const { updateBreadcrumbs, updateTabTitle, updateTools } = useTools();
    const { toLocaleDateString } = useDateUtils();
    const [getTextures, getTexturesState] = useGetEnvironmentTexturesMutation();

    const { nav, queryOptions } = useMeta(getTextures, getTexturesState, {
        triggerParams: { admin: true },
        useTrashed: false,
    });

    const refetchTextures = () => getTextures({ options: queryOptions, admin: true });

    useEffect(() => {
        updateBreadcrumbs([{ name: 'Admin', uri: '/admin' }, { name: 'HDRIs' }]);
        updateTabTitle('HDRIs');
        updateTools([<StoreEnvironmentTexture key={'store_texture'} {...{ onSuccess: refetchTextures }} />]);
    }, []);

    useEffect(() => {
        getTexturesState.data && setTextures(getTexturesState.data);
    }, [getTexturesState]);

    return (
        <div className={classes.root}>
            {nav()}
            <Grid className={classes.container} container>
                <Grid item xs={12} sm={10} md={8}>
                    <TableContainer component={Paper}>
                        <Table size={'small'} aria-label={'expo'}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Created</TableCell>
                                    <TableCell align={'right'}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {!textures ? (
                                    [...Array(10)].map((el, i) => (
                                        <TableRow key={i}>
                                            <TableCell colSpan={3}>
                                                <Skeleton
                                                    style={{ flexGrow: 1 }}
                                                    animation={'wave'}
                                                    variant={'rectangular'}
                                                    height={25}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : textures.length > 0 ? (
                                    textures.map((texture) => (
                                        <TableRow hover={true} key={texture.id}>
                                            <TableCell>
                                                <Typography noWrap={true} variant={'body2'}>
                                                    {texture.name}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography noWrap={true} variant={'body2'}>
                                                    <ReactTimeAgo
                                                        key={`${texture.id}_created`}
                                                        date={new Date(texture.created_at)}
                                                        title={toLocaleDateString(texture.created_at)}
                                                    />
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Stack justifyContent={'flex-end'} direction={'row'} spacing={1}>
                                                    <PublishEnvironmentTexture
                                                        {...{ texture, onSuccess: refetchTextures }}
                                                    />
                                                    <RenameEnvironmentTexture
                                                        {...{ texture, onSuccess: refetchTextures }}
                                                    />
                                                    <DeleteEnvironmentTexture
                                                        {...{ texture, onSuccess: refetchTextures }}
                                                    />
                                                </Stack>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4}>No HDRIs.</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
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

export default HDRIsScreen;
