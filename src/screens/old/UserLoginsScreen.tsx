import { FC, useEffect, useState } from 'react';
import { useTools } from '@intractinc/base/contexts/ToolsContext';
import { makeStyles } from 'tss-react/mui';
import useMeta from '@intractinc/base/hooks/useMeta';
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
    Link,
} from '@mui/material';
import ImageAvatar from '@intractinc/base/layout/navbar/ImageAvatar';
import ReactTimeAgo from 'react-timeago';
import useDateUtils from '@intractinc/base/hooks/useDateUtils';
import CloseIcon from '@mui/icons-material/Close';
import { useGetUserLoginsAdminMutation } from '@intractinc/base/redux/features/adminLogins';
import CheckIcon from '@mui/icons-material/Check';
import { Link as RouterLink } from 'react-router-dom';

const UserLoginsScreen: FC = () => {
    const { updateBreadcrumbs, updateTabTitle } = useTools();
    const { toLocaleDateString } = useDateUtils();
    const { classes } = useStyles();
    const [getLogins, getLoginsState] = useGetUserLoginsAdminMutation();
    const [logins, setLogins] = useState<UserLogin[] | null>(null);

    const { nav } = useMeta(getLogins, getLoginsState, {
        useTrashed: false,
        sortName: false,
        useSearch: false,
        include: 'user',
    });

    useEffect(() => {
        updateBreadcrumbs([{ name: 'Admin', uri: '/admin' }, { name: 'User Logins' }]);

        updateTabTitle(`User Logins`);
    }, []);

    useEffect(() => {
        getLoginsState.data?.data && setLogins(getLoginsState.data.data);
    }, [getLoginsState]);

    return (
        <div className={classes.root}>
            {nav()}
            <Grid className={classes.container} container columns={15} alignItems={'top'}>
                <TableContainer component={Paper}>
                    <Table size={'small'} aria-label={'decks'}>
                        <TableHead>
                            <TableRow>
                                <TableCell>User</TableCell>
                                <TableCell>Time</TableCell>
                                <TableCell>IP</TableCell>
                                <TableCell>Cellular</TableCell>
                                <TableCell>Proxy</TableCell>
                                <TableCell>Continent</TableCell>
                                <TableCell>Country</TableCell>
                                <TableCell>Region</TableCell>
                                <TableCell>City</TableCell>
                                <TableCell>ISP</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {logins ? (
                                logins.length ? (
                                    logins.map((login) => (
                                        <TableRow
                                            hover={true}
                                            key={login.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell>
                                                {login.user && (
                                                    <Link
                                                        component={RouterLink}
                                                        to={`/admin/users/${login.user_id}`}
                                                        sx={(theme) => ({
                                                            color: theme.palette.text.primary,
                                                            textDecoration: 'none',
                                                        })}
                                                    >
                                                        <Stack alignItems={'center'} direction={'row'} spacing={1}>
                                                            <ImageAvatar
                                                                {...{
                                                                    type: 'user',
                                                                    avatar: login.user.avatar_route,
                                                                    name: login.user.name,
                                                                    size: 35,
                                                                }}
                                                            />
                                                            <Typography
                                                                sx={{ cursor: 'pointer' }}
                                                                noWrap={true}
                                                                variant={'body1'}
                                                            >
                                                                {login.user.name}
                                                            </Typography>
                                                        </Stack>
                                                    </Link>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <Typography noWrap={true} variant={'body2'}>
                                                    <ReactTimeAgo
                                                        key={`${login.id}_created`}
                                                        date={new Date(login.created_at)}
                                                        title={toLocaleDateString(login.created_at)}
                                                    />
                                                </Typography>
                                            </TableCell>
                                            <TableCell>{login.ip}</TableCell>
                                            <TableCell>
                                                {login.mobile ? (
                                                    <CheckIcon sx={{ color: 'success.main' }} />
                                                ) : (
                                                    <CloseIcon sx={{ color: 'error.main' }} />
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {login.proxy ? (
                                                    <CheckIcon sx={{ color: 'success.main' }} />
                                                ) : (
                                                    <CloseIcon sx={{ color: 'error.main' }} />
                                                )}
                                            </TableCell>
                                            <TableCell>{login.continent}</TableCell>
                                            <TableCell>{login.country}</TableCell>
                                            <TableCell>{login.region_name}</TableCell>
                                            <TableCell>{login.city}</TableCell>
                                            <TableCell>{login.isp}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={9}>
                                            <Typography>No logins.</Typography>
                                        </TableCell>
                                    </TableRow>
                                )
                            ) : (
                                <>
                                    {[...Array(10)].map((_el, i) => (
                                        <TableRow key={i}>
                                            <TableCell colSpan={10}>
                                                <Skeleton
                                                    style={{ flexGrow: 1 }}
                                                    animation={'wave'}
                                                    variant={'rectangular'}
                                                    height={35}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
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
        paddingRight: theme.spacing(2),
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
    link: {
        color: theme.palette.text.primary,
        textDecoration: 'none',
        height: '100%',
    },
}));

export default UserLoginsScreen;
