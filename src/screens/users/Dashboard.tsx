import { makeStyles } from 'tss-react/mui';
import { Box, Paper, Typography } from '@mui/material';
import { useAppSelector } from '@/redux/hooks';
import UserChroniclesTable from '@/screens/chronicles/UserChroniclesTable';

const Dashboard = () => {
    const { classes } = useStyles();
    const user = useAppSelector((state) => state.user);

    return (
        <Box className={classes.root} component={Paper}>
            <Typography className={classes.header}>Welcome {user.name}</Typography>
            {(user?.data?.chronicles_count ?? 0) > 0 && <UserChroniclesTable />}
        </Box>
    );
};

const useStyles = makeStyles()((theme) => ({
    root: { display: 'flex', flexShrink: 1, flexDirection: 'column', padding: theme.spacing(2), minHeight: 600 },
    header: { marginBottom: theme.spacing(2) },
}));

export default Dashboard;
