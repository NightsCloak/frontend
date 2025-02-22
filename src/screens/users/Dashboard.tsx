import { makeStyles } from 'tss-react/mui';
import { Box, Paper, Typography } from '@mui/material';
import { useAppSelector } from '@/redux/hooks';
import Chronicles from '@/screens/users/dashboard/Chronicles';

const Dashboard = () => {
    const { classes } = useStyles();
    const user = useAppSelector((state) => state.user);

    return (
        <Box className={classes.root} component={Paper}>
            <Typography className={classes.header}>Welcome {user.name}</Typography>
            <Chronicles />
        </Box>
    );
};

const useStyles = makeStyles()((theme) => ({
    root: { display: 'flex', flexShrink: 1, flexDirection: 'column', padding: theme.spacing(2), maxHeight: 500 },
    header: { marginBottom: theme.spacing(2) },
}));

export default Dashboard;
