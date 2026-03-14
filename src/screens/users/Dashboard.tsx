import { makeStyles } from 'tss-react/mui';
import { Box, Paper, Typography } from '@mui/material';
import { useAppSelector } from '@/redux/hooks';

const Dashboard = () => {
    const { classes } = useStyles();
    const user = useAppSelector((state) => state.user);

    return (
        <Box className={classes.root} component={Paper}>
            Hello
            <br />
            <br />
            <Typography className={classes.header}>Welcome {user.name}</Typography>
        </Box>
    );
};

const useStyles = makeStyles()((theme) => ({
    root: {
        display: 'flex',
        flexShrink: 1,
        flexDirection: 'column',
        padding: theme.spacing(2),
    },
    header: { marginBottom: theme.spacing(2) },
}));

export default Dashboard;
