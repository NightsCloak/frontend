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
import { useGetPluginsMutation } from '@intractinc/base/redux/features/intractPlugin';
import ReactTimeAgo from 'react-timeago';
import useDateUtils from '@intractinc/base/hooks/useDateUtils';
import { useTools } from '@intractinc/base/contexts/ToolsContext';
import StorePlugin from '@intractinc/base/components/IntractPlugins/StorePlugin';
import TogglePlugin from '@intractinc/base/components/IntractPlugins/TogglePlugin';
import DeletePlugin from '@intractinc/base/components/IntractPlugins/DeletePlugin';

const PluginsScreen: FC = () => {
    const { classes } = useStyles();
    const [plugins, setPlugins] = useState<IntractPlugin[] | null>(null);
    const { updateBreadcrumbs, updateTabTitle, updateTools } = useTools();
    const { toLocaleDateString } = useDateUtils();
    const [getPlugins, getPluginsState] = useGetPluginsMutation();

    const { nav } = useMeta(getPlugins, getPluginsState, {
        useSearch: false,
        useTrashed: false,
        sortName: false,
    });

    const refetchPlugins = () => getPlugins(null);

    useEffect(() => {
        updateBreadcrumbs([{ name: 'Admin', uri: '/admin' }, { name: 'Plugins' }]);
        updateTabTitle('Plugins');
        updateTools([<StorePlugin key={'plugin'} {...{ onSuccess: refetchPlugins }} />]);
    }, []);

    useEffect(() => {
        getPluginsState.data && setPlugins(getPluginsState.data);
    }, [getPluginsState]);

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
                                    <TableCell>Type</TableCell>
                                    <TableCell>Created</TableCell>
                                    <TableCell align={'right'}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {!plugins ? (
                                    [...Array(10)].map((el, i) => (
                                        <TableRow key={i}>
                                            <TableCell colSpan={4}>
                                                <Skeleton
                                                    style={{ flexGrow: 1 }}
                                                    animation={'wave'}
                                                    variant={'rectangular'}
                                                    height={25}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : plugins.length > 0 ? (
                                    plugins.map((plugin) => (
                                        <TableRow hover={true} key={plugin.id}>
                                            <TableCell>
                                                <Typography noWrap={true} variant={'body2'}>
                                                    {plugin.name}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography noWrap={true} variant={'body2'}>
                                                    {plugin.type}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography noWrap={true} variant={'body2'}>
                                                    <ReactTimeAgo
                                                        key={`${plugin.id}_created`}
                                                        date={new Date(plugin.created_at)}
                                                        title={toLocaleDateString(plugin.created_at)}
                                                    />
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Stack justifyContent={'flex-end'} direction={'row'} spacing={1}>
                                                    <TogglePlugin {...{ plugin, onSuccess: refetchPlugins }} />
                                                    <DeletePlugin {...{ plugin, onSuccess: refetchPlugins }} />
                                                </Stack>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4}>No plugins.</TableCell>
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

export default PluginsScreen;
