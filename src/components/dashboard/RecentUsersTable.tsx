import { useGetRecentUsersAdminQuery } from '@intractinc/base/redux/features/adminUser';
import { Grid2 as Grid } from '@mui/material';

const RecentUsersTable = () => {
    const { data: users } = useGetRecentUsersAdminQuery(null, {
        refetchOnMountOrArgChange: true,
        pollingInterval: 60000,
    });

    return <Grid container>{users?.map((user) => <Grid>{user.name}</Grid>)}</Grid>;
};

export default RecentUsersTable;
