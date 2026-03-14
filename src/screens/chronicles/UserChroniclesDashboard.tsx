import { Box } from '@mui/material';
import UserChroniclesTable from '@/screens/chronicles/UserChroniclesTable';
import { makeStyles } from 'tss-react/mui';
import { useTools } from '@/contexts/ToolsContext';
import { useEffect } from 'react';

const UserChroniclesDashboard = () => {
    const { classes } = useStyles();
    const { updateBreadcrumbs, updateTabTitle } = useTools();

    useEffect(() => {
        updateBreadcrumbs([{ name: 'Your Chronicles' }]);
        updateTabTitle('Chronicles');
    }, []);

    return (
        <Box className={classes.root} component={'div'}>
            <UserChroniclesTable />
        </Box>
    );
};

const useStyles = makeStyles()((theme) => ({
    root: { display: 'flex', flexShrink: 1, flexDirection: 'column', minHeight: 400 },
    header: { marginBottom: theme.spacing(2) },
}));

export default UserChroniclesDashboard;
