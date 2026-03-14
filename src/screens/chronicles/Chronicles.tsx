import { Box, Typography } from '@mui/material';

import { makeStyles } from 'tss-react/mui';
import ChroniclesTable from '@/screens/chronicles/ChroniclesTable';

const ChroniclesDashboard = () => {
    const { classes } = useStyles();

    return (
        <Box className={classes.root} component={'div'}>
            <Typography variant={'h3'}>Chronicles</Typography>
            <ChroniclesTable />
        </Box>
    );
};

const useStyles = makeStyles()((theme) => ({
    root: { display: 'flex', flex: 1, flexDirection: 'column', minHeight: 400 },
    header: { marginBottom: theme.spacing(2) },
}));

export default ChroniclesDashboard;
