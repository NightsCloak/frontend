import { useAppSelector } from '@intractinc/base/redux/hooks';
import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHeartbeatQuery } from '@intractinc/base/redux/features/auth';
import { LinearProgress, Paper, Theme, Typography, useTheme } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { Engineering } from '@mui/icons-material';
import { useTools } from '@intractinc/base/contexts/ToolsContext';

const MaintenanceScreen: FC = () => {
    useHeartbeatQuery(undefined, { pollingInterval: 15000 });
    const maintenance = useAppSelector((state) => state.app.maintenance);
    const theme = useTheme();
    const { classes } = useStyles();
    const navigate = useNavigate();
    const { updateTabTitle, updateBreadcrumbs } = useTools();

    useEffect(() => {
        !maintenance && navigate('/');
    }, [maintenance]);

    useEffect(() => {
        updateTabTitle('Maintenance');
        updateBreadcrumbs([]);
    }, []);

    return (
        <div className={classes.root}>
            <Paper className={classes.formRoot}>
                <div className={classes.header}>
                    <Typography variant={'h4'}>
                        <Engineering style={{ fontSize: 25 }} /> Refining our engine...
                    </Typography>
                </div>
                <LinearProgress sx={{ height: 18, borderRadius: 1 }} color={'secondary'} variant={'indeterminate'} />
                <Typography style={{ margin: theme.spacing(2) }} variant={'body1'}>
                    Your page will automatically reload once our maintenance has concluded. Thank you for your patience.
                </Typography>
            </Paper>
        </div>
    );
};

const useStyles = makeStyles()((theme: Theme) => ({
    root: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '& .MuiPaper-root': {
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            boxShadow: '0px 0px 0px 0px rgba(0,0,0,0)',
            padding: theme.spacing(2),
            paddingBottom: theme.spacing(3),
            width: 600,
        },
    },
    formRoot: {
        [theme.breakpoints.down('sm')]: {
            width: '75%',
        },
    },
    header: {
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center',
        padding: theme.spacing(1),
        marginBottom: 10,
        borderRadius: 10,
        backgroundColor: theme.palette.background.default,
    },
}));

export default MaintenanceScreen;
