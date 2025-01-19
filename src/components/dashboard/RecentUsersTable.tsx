import { useGetRecentUsersAdminQuery } from '@intractinc/base/redux/features/adminUser';
import { Typography } from '@mui/material';
import ReactTimeAgo from 'react-timeago';
import { makeStyles } from 'tss-react/mui';
import { DataGridPremium, GridColDef, GridRenderCellParams } from '@mui/x-data-grid-premium';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const RecentUsersTable = () => {
    const { classes } = useStyles();
    const { data: users } = useGetRecentUsersAdminQuery(null, {
        refetchOnMountOrArgChange: true,
        pollingInterval: 60000,
    });

    const fields: GridColDef[] = [
        { field: 'name', headerName: 'Name', minWidth: 150 },
        { field: 'email', headerName: 'Email', minWidth: 175 },
        {
            field: 'is_verified',
            headerName: 'Verified',

            headerAlign: 'center',
            align: 'center',
            renderCell: (params: GridRenderCellParams<User>) =>
                params.value ? (
                    <CheckIcon sx={{ color: 'success.main' }} />
                ) : (
                    <CloseIcon sx={{ color: 'error.main' }} />
                ),
        },
        {
            field: 'created_at',
            headerName: 'Joined',
            renderCell: (params: GridRenderCellParams<User>) => (
                <ReactTimeAgo key={`${params.row.id}_created`} date={new Date(params.value)} />
            ),
        },
    ];

    return (
        <div className={classes.root}>
            <Typography variant={'h5'} color={'intract.main'}>
                Recent Users
            </Typography>

            <DataGridPremium
                pagination
                density={'compact'}
                columns={fields}
                rows={users ?? []}
                autoPageSize
                autosizeOnMount
            />
        </div>
    );
};

const useStyles = makeStyles()((theme) => ({
    root: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minHeight: 350,
    },
}));

export default RecentUsersTable;
