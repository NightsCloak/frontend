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
import ReactTimeAgo from 'react-timeago';
import { useGetOrganizationsAdminMutation } from '@intractinc/base/redux/features/adminOrganization';
import OrganizationStorageBar from '@intractinc/base/components/Organizations/OrganizationStorageBar';
import OrganizationTierChip from '@intractinc/base/components/Organizations/OrganizationTierChip';
import { Link as RouterLink } from 'react-router-dom';
import ImageAvatar from '@intractinc/base/layout/navbar/ImageAvatar';
import OrganizationSubscriptionChip from '@intractinc/base/components/Billing/Organization/OrganizationSubscriptionChip';
import OrganizationMenu from '@intractinc/base/components/Admin/Organizations/OrganizationMenu';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const OrganizationsScreen: FC = () => {
    const { classes } = useStyles();
    const [organizations, setOrganizations] = useState<Organization[] | null>(null);
    const { updateBreadcrumbs, updateTabTitle } = useTools();
    const { toLocaleDateString } = useDateUtils();
    const [getOrganizations, getOrganizationsState] = useGetOrganizationsAdminMutation();

    const { nav, showTrashed, queryOptions } = useMeta(getOrganizations, getOrganizationsState, {
        include: 'projectsCount,membersCount,currentSubscription,owner.user',
    });

    const refetchOrganizations = () => getOrganizations({ options: queryOptions });

    useEffect(() => {
        updateBreadcrumbs([{ name: 'Admin', uri: '/admin' }, { name: 'Organizations' }]);
        updateTabTitle('Organizations');
    }, []);

    useEffect(() => {
        getOrganizationsState.data && setOrganizations(getOrganizationsState.data.data);
    }, [getOrganizationsState]);

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
                                    <TableCell>Subscription</TableCell>
                                    <TableCell>Storage</TableCell>
                                    <TableCell>Owner</TableCell>
                                    <TableCell>Testing Access</TableCell>
                                    <TableCell>Members</TableCell>
                                    <TableCell>Projects</TableCell>
                                    <TableCell>Created</TableCell>
                                    {showTrashed && <TableCell>Archived</TableCell>}
                                    <TableCell align={'right'}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {!organizations ? (
                                    [...Array(25)].map((el, i) => (
                                        <TableRow key={i}>
                                            <TableCell colSpan={showTrashed ? 10 : 9}>
                                                <Skeleton
                                                    style={{ flexGrow: 1 }}
                                                    animation={'wave'}
                                                    variant={'rectangular'}
                                                    height={25}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : organizations.length > 0 ? (
                                    organizations.map((organization) => (
                                        <TableRow hover={true} key={organization.id}>
                                            <TableCell>
                                                <Link
                                                    component={RouterLink}
                                                    to={`/admin/organizations/${organization.id}`}
                                                    sx={(theme) => ({
                                                        color: theme.palette.text.primary,
                                                        textDecoration: 'none',
                                                    })}
                                                >
                                                    <Stack alignItems={'center'} direction={'row'} spacing={1}>
                                                        <ImageAvatar
                                                            {...{
                                                                type: 'organization',
                                                                avatar: organization.avatar_route,
                                                                name: organization.name,
                                                                size: 35,
                                                                disableClickable: true,
                                                            }}
                                                        />
                                                        <Typography noWrap={true} variant={'body1'}>
                                                            {organization.name}
                                                        </Typography>
                                                        <OrganizationTierChip {...{ organization }} />
                                                    </Stack>
                                                </Link>
                                            </TableCell>
                                            <TableCell>
                                                <OrganizationSubscriptionChip
                                                    {...{ subscription: organization.current_subscription }}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <OrganizationStorageBar {...{ organization }} />
                                            </TableCell>
                                            <TableCell>
                                                {organization.owner?.user && (
                                                    <Link
                                                        component={RouterLink}
                                                        to={`/admin/users/${organization.owner.user.id}`}
                                                        sx={(theme) => ({
                                                            color: theme.palette.text.primary,
                                                            textDecoration: 'none',
                                                        })}
                                                    >
                                                        <Stack alignItems={'center'} direction={'row'} spacing={1}>
                                                            <ImageAvatar
                                                                {...{
                                                                    type: 'user',
                                                                    avatar: organization.owner.user.avatar_route,
                                                                    name: organization.owner.user.name,
                                                                    size: 35,
                                                                    disableClickable: true,
                                                                }}
                                                            />
                                                            <Typography
                                                                sx={{ cursor: 'pointer' }}
                                                                noWrap={true}
                                                                variant={'body1'}
                                                            >
                                                                {organization.owner.user.name}
                                                            </Typography>
                                                        </Stack>
                                                    </Link>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {organization.has_testing_access ? (
                                                    <CheckIcon sx={{ color: 'success.main' }} />
                                                ) : (
                                                    <CloseIcon sx={{ color: 'error.main' }} />
                                                )}
                                            </TableCell>
                                            <TableCell>{organization.members_count}</TableCell>
                                            <TableCell>{organization.projects_count}</TableCell>
                                            <TableCell>
                                                <Typography noWrap={true} variant={'body2'}>
                                                    <ReactTimeAgo
                                                        key={`${organization.id}_created`}
                                                        date={new Date(organization.created_at)}
                                                        title={toLocaleDateString(organization.created_at)}
                                                    />
                                                </Typography>
                                            </TableCell>
                                            {organization.deleted_at && (
                                                <TableCell>
                                                    <Typography noWrap={true} variant={'body2'}>
                                                        <ReactTimeAgo
                                                            key={`${organization.id}_deleted`}
                                                            date={new Date(organization.deleted_at)}
                                                            title={toLocaleDateString(organization.deleted_at)}
                                                        />
                                                    </Typography>
                                                </TableCell>
                                            )}
                                            <TableCell align={'right'}>
                                                <OrganizationMenu
                                                    {...{ organization, refetch: refetchOrganizations }}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={showTrashed ? 10 : 9}>No organizations.</TableCell>
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

export default OrganizationsScreen;
