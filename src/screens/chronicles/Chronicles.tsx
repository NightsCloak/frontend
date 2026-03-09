import { Box, Paper, Typography } from '@mui/material';

import { makeStyles } from 'tss-react/mui';
import ChroniclesTable from '@/screens/chronicles/ChroniclesTable';

const ChroniclesDashboard = () => {
    const { classes } = useStyles();

    return (
        <Box className={classes.root} component={Paper}>
            <Typography variant={'h3'}>Chronicles</Typography>
            <ChroniclesTable />
        </Box>
    );
};

const useStyles = makeStyles()((theme) => ({
    root: { display: 'flex', flexShrink: 1, flexDirection: 'column', padding: theme.spacing(2), minHeight: 400 },
    header: { marginBottom: theme.spacing(2) },
}));

export default ChroniclesDashboard;
