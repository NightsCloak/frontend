import { makeStyles } from 'tss-react/mui';
import { Box, Paper, Typography } from '@mui/material';
import { useAppSelector } from '@/redux/hooks';
import ChroniclesTable from '@/screens/chronicles/ChroniclesTable';

const Dashboard = () => {
    const { classes } = useStyles();
    const user = useAppSelector((state) => state.user);

    return (
        <Box className={classes.root} component={Paper}>
            <Typography className={classes.header}>Welcome {user.name}</Typography>
            <ChroniclesTable />
        </Box>
    );
};

const useStyles = makeStyles()((theme) => ({
    root: { display: 'flex', flexShrink: 1, flexDirection: 'column', padding: theme.spacing(2), minHeight: 600 },
    header: { marginBottom: theme.spacing(2) },
}));

export default Dashboard;
