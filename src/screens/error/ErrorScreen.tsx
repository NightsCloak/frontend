import { Alert, AlertTitle, Button, Paper, Theme } from '@mui/material';
import { Home, Launch } from '@mui/icons-material';
import { makeStyles } from 'tss-react/mui';
import { useNavigate } from 'react-router-dom';
import { FC, useEffect } from 'react';
import { Dots } from 'react-activity';
import { useTools } from '@intractinc/base/contexts/ToolsContext';
import { useWorkspace } from '@intractinc/base/contexts/WorkspaceContext';

interface ErrorProps {
    title?: string;
    message?: string;
    navigateTo?: string;
    screenNotFound?: boolean;
}

const ErrorScreen: FC<ErrorProps> = ({ title, message, navigateTo, screenNotFound }) => {
    const { organization, project } = useWorkspace();
    const { classes } = useStyles();
    const navigate = useNavigate();
    const { updateTabTitle } = useTools();

    const showAsBack = navigateTo !== undefined || (screenNotFound && organization !== undefined);

    const redirect = () => {
        if (navigateTo) {
            return navigateTo;
        }

        if (!screenNotFound || !organization) {
            return '/home';
        }

        if (project) {
            return `/organizations/${project.organization_id}/projects/${project.id}`;
        }

        if (organization) {
            return `/organizations/${organization.id}`;
        }

        return '/home';
    };

    useEffect(() => {
        updateTabTitle(title ?? 'Error');
    }, []);

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <div className={classes.header}>
                    <Alert icon={<Dots size={26} />} severity={'warning'}>
                        <AlertTitle sx={{ fontSize: 26 }}>{message ?? 'Something went wrong.'}</AlertTitle>
                    </Alert>
                </div>
                <Button
                    fullWidth={true}
                    onClick={() => navigate(redirect())}
                    size={'large'}
                    variant={'contained'}
                    color={'secondary'}
                    startIcon={showAsBack ? <Launch /> : <Home />}
                >
                    {showAsBack ? 'Back' : 'Home'}
                </Button>
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
            minWidth: 400,
            maxWidth: 750,
            [theme.breakpoints.down('sm')]: {
                minWidth: '100%',
            },
        },
    },
    paper: {
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        boxShadow: '0px 0px 0px 0px rgba(0,0,0,0)',
        padding: theme.spacing(2),
        paddingBottom: theme.spacing(3),
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
    },
    header: {
        flexGrow: 1,
        display: 'flex',
        marginBottom: theme.spacing(4),
    },
}));

export default ErrorScreen;
