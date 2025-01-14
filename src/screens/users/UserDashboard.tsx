import { useGetUsersAdminMutation } from '@intractinc/base/redux/features/adminUser';
import { Spinner } from 'react-activity';
import { DataGridPremium, GridRenderCellParams } from '@mui/x-data-grid-premium';
import { makeStyles } from 'tss-react/mui';
import { Typography } from '@mui/material';
import UserSubscriptionChip from '@intractinc/base/components/Billing/User/UserSubscriptionChip';
import { useTools } from '@intractinc/base/contexts/ToolsContext';
import useMeta from '@intractinc/base/hooks/useMeta';
import { useEffect, useState } from 'react';

type VisibleColumns = {
    [key: string]: boolean;
};

const UserDashboard = () => {
    const { classes } = useStyles();
    const [columnVisibility, setColumnVisibility] = useState<VisibleColumns>({
        name: true,
        email: true,
        subscription: true,
        logins_count: false,
        assets_count: true,
        asset_collections_count: true,
        textures_count: true,
        ai_textures_count: true,
    });
    const { updateBreadcrumbs, updateTabTitle } = useTools();
    // const { toLocaleDateString } = useDateUtils();
    const [getUsers, getUsersState] = useGetUsersAdminMutation();

    const { data: users } = useMeta(getUsers, getUsersState, {
        sortFirst: true,
        sortLast: true,
        sortName: false,
        include:
            'assetsCount,assetCollectionsCount,organizationMembersCount,texturesCount,aiTexturesCount,loginsCount,currentSubscription',
        initialLimit: 25,
    });

    const fields = [
        { field: 'name', headerName: 'Name' },
        { field: 'email', headerName: 'Email', minWidth: 200 },
        {
            field: 'subscription',
            headerName: 'Subscription',
            renderCell: (params: GridRenderCellParams<User>) => {
                console.log('params', params);
                return <UserSubscriptionChip subscription={params.row.current_subscription} />;
            },
            minWidth: 200,
        },
        { field: 'logins_count', headerName: 'Logins', minWidth: 100 },
        { field: 'assets_count', headerName: 'Assets', minWidth: 100 },
        { field: 'asset_collections_count', headerName: 'Folders', minWidth: 100 },
        { field: 'organization_members_count', headerName: 'Organizations', minWidth: 100 },
        { field: 'textures_count', headerName: 'Textures', minWidth: 100 },
        { field: 'ai_textures_count', headerName: 'AI Textures', minWidth: 100 },
    ];

    const handelColumnVisibilityChange = (model: VisibleColumns) => {
        setColumnVisibility(model);
    };

    // const refetchUsers = () => getUsers({ options: queryOptions });

    useEffect(() => {
        updateBreadcrumbs([{ name: 'Admin', uri: '/admin' }, { name: 'Users' }]);
        updateTabTitle('Users');
    }, []);

    if (!users) return <Spinner />;

    return (
        <div className={classes.root}>
            <Typography className={classes.header} variant={'h5'}>
                Recent Users
            </Typography>
            <DataGridPremium
                columnVisibilityModel={columnVisibility}
                onColumnVisibilityModelChange={handelColumnVisibilityChange}
                columns={fields}
                rows={users.data}
                autoPageSize
            />
        </div>
    );
};

const useStyles = makeStyles()((theme) => ({
    root: { display: 'flex', flex: 1, flexDirection: 'column' },
    header: { marginBottom: theme.spacing(2) },
}));

export default UserDashboard;
