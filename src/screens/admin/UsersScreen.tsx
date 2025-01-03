import {
    Grid,
    Link,
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
import useDateUtils from '@intractinc/base/hooks/useDateUtils';
import { useTools } from '@intractinc/base/contexts/ToolsContext';
import { useGetUsersAdminMutation } from '@intractinc/base/redux/features/adminUser';
import UserSubscriptionChip from '@intractinc/base/components/Billing/User/UserSubscriptionChip';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import ReactTimeAgo from 'react-timeago';
import ImageAvatar from '@intractinc/base/layout/navbar/ImageAvatar';
import { Link as RouterLink } from 'react-router-dom';
import UserStorageBar from '@intractinc/base/components/Users/UserStorageBar';
import UserMenu from '@intractinc/base/components/Admin/Users/UserMenu';

const UsersScreen: FC = () => {
    const { classes } = useStyles();
    const [users, setUsers] = useState<User[] | null>(null);
    const { updateBreadcrumbs, updateTabTitle } = useTools();
    const { toLocaleDateString } = useDateUtils();
    const [getUsers, getUsersState] = useGetUsersAdminMutation();

    const { nav, queryOptions, showTrashed } = useMeta(getUsers, getUsersState, {
        sortFirst: true,
        sortLast: true,
        sortName: false,
        include:
            'assetsCount,assetCollectionsCount,organizationMembersCount,texturesCount,aiTexturesCount,loginsCount,currentSubscription',
    });

    const refetchUsers = () => getUsers({ options: queryOptions });

    useEffect(() => {
        updateBreadcrumbs([{ name: 'Admin', uri: '/admin' }, { name: 'Users' }]);
        updateTabTitle('Users');
    }, []);

    useEffect(() => {
        getUsersState.data && setUsers(getUsersState.data.data);
    }, [getUsersState]);

    return (
        <div className={classes.root}>
            {nav()}
            <Grid className={classes.container} container>
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table size={'small'} aria-label={'users'}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Subscription</TableCell>
                                    <TableCell>Storage</TableCell>
                                    <TableCell>Enabled</TableCell>
                                    <TableCell>Admin</TableCell>
                                    <TableCell>Verified</TableCell>
                                    <TableCell>Organizations</TableCell>
                                    <TableCell>Assets</TableCell>
                                    <TableCell>Folders</TableCell>
                                    <TableCell>Textures</TableCell>
                                    <TableCell>A.I. Textures</TableCell>
                                    <TableCell>Logins</TableCell>
                                    <TableCell>Joined</TableCell>
                                    {showTrashed && <TableCell>Archived</TableCell>}
                                    <TableCell align={'right'}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {!users ? (
                                    [...Array(25)].map((el, i) => (
                                        <TableRow key={i}>
                                            <TableCell colSpan={showTrashed ? 16 : 15}>
                                                <Skeleton
                                                    style={{ flexGrow: 1 }}
                                                    animation={'wave'}
                                                    variant={'rectangular'}
                                                    height={25}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : users.length > 0 ? (
                                    users.map((user) => (
                                        <TableRow hover={true} key={user.id}>
                                            <TableCell>
                                                <Link
                                                    component={RouterLink}
                                                    to={`/admin/users/${user.id}`}
                                                    sx={(theme) => ({
                                                        color: theme.palette.text.primary,
                                                        textDecoration: 'none',
                                                    })}
                                                >
                                                    <Stack alignItems={'center'} direction={'row'} spacing={1}>
                                                        <ImageAvatar
                                                            {...{
                                                                type: 'user',
                                                                avatar: user.avatar_route,
                                                                name: user.name,
                                                                size: 35,
                                                                disableClickable: true,
                                                            }}
                                                        />
                                                        <Typography
                                                            sx={{ cursor: 'pointer' }}
                                                            noWrap={true}
                                                            variant={'body1'}
                                                        >
                                                            {user.name}
                                                        </Typography>
                                                    </Stack>
                                                </Link>
                                            </TableCell>
                                            <TableCell>
                                                <Typography noWrap={true} variant={'body2'}>
                                                    {user.email}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <UserSubscriptionChip
                                                    {...{ subscription: user.current_subscription }}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <UserStorageBar {...{ compact: true, user }} />
                                            </TableCell>
                                            <TableCell>
                                                {user.is_enabled ? (
                                                    <CheckIcon sx={{ color: 'success.main' }} />
                                                ) : (
                                                    <CloseIcon sx={{ color: 'error.main' }} />
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {user.is_admin ? (
                                                    <CheckIcon sx={{ color: 'success.main' }} />
                                                ) : (
                                                    <CloseIcon sx={{ color: 'error.main' }} />
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {user.is_verified ? (
                                                    <CheckIcon sx={{ color: 'success.main' }} />
                                                ) : (
                                                    <CloseIcon sx={{ color: 'error.main' }} />
                                                )}
                                            </TableCell>
                                            <TableCell>{user.organization_members_count}</TableCell>
                                            <TableCell>{user.assets_count}</TableCell>
                                            <TableCell>{user.asset_collections_count}</TableCell>
                                            <TableCell>{user.textures_count}</TableCell>
                                            <TableCell>{user.ai_textures_count}</TableCell>
                                            <TableCell>{user.logins_count}</TableCell>
                                            <TableCell>
                                                <Typography noWrap={true} variant={'body2'}>
                                                    <ReactTimeAgo
                                                        key={`${user.id}_created`}
                                                        date={new Date(user.created_at)}
                                                        title={toLocaleDateString(user.created_at)}
                                                    />
                                                </Typography>
                                            </TableCell>
                                            {user.deleted_at && (
                                                <TableCell>
                                                    <Typography noWrap={true} variant={'body2'}>
                                                        <ReactTimeAgo
                                                            key={`${user.id}_deleted`}
                                                            date={new Date(user.deleted_at)}
                                                            title={toLocaleDateString(user.deleted_at)}
                                                        />
                                                    </Typography>
                                                </TableCell>
                                            )}
                                            <TableCell align={'right'}>
                                                <UserMenu {...{ user, refetch: refetchUsers }} />
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={15}>No users.</TableCell>
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

export default UsersScreen;
