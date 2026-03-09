import { Box, Paper, Typography } from '@mui/material';
import UserChroniclesTable from '@/screens/chronicles/UserChroniclesTable';
import { makeStyles } from 'tss-react/mui';

const UserChroniclesDashboard = () => {
    const { classes } = useStyles();

    return (
        <Box className={classes.root} component={Paper}>
            <Typography variant={'h3'}>Chronicles</Typography>
            <UserChroniclesTable />
        </Box>
    );
};

const useStyles = makeStyles()((theme) => ({
    root: { display: 'flex', flexShrink: 1, flexDirection: 'column', padding: theme.spacing(2), minHeight: 400 },
    header: { marginBottom: theme.spacing(2) },
}));

export default UserChroniclesDashboard;
