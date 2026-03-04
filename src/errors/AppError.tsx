import { makeStyles } from 'tss-react/mui';
import { Alert, AlertTitle, Button, IconButton, Theme, Typography } from '@mui/material';
import { FC } from 'react';
import { imagePaths } from '@/hooks/useImagePaths';
import CloseIcon from '@mui/icons-material/Close';

type AppErrorProps = {
    message?: string;
    useAlert?: boolean;
};

const AppError: FC<AppErrorProps> = ({ message, useAlert }) => {
    const { classes, theme } = useStyles();

    const _message = message ?? 'Update needed. Please reload your page.';

    return (
        <div className={classes.root}>
            {useAlert ? (
                <Alert
                    severity={'error'}
                    action={
                        <IconButton size={'medium'} onClick={() => window.location.reload()}>
                            <CloseIcon fontSize={'inherit'} sx={{ fontSize: 20 }} />
                        </IconButton>
                    }
                >
                    <AlertTitle>{_message}</AlertTitle>
                </Alert>
            ) : (
                <div className={classes.main}>
                    <img
                        className={classes.logo}
                        src={theme.palette.mode === 'dark' ? imagePaths.lightLogo : imagePaths.darkLogo}
                        height={'10%'}
                        alt={'oops'}
                    />
                    <Typography variant={'h6'}>{_message}</Typography>
                    <Button
                        color={'secondary'}
                        className={classes.reloadButton}
                        variant={'contained'}
                        onClick={() => window.location.reload()}
                    >
                        Reload
                    </Button>
                </div>
            )}
        </div>
    );
};

const useStyles = makeStyles()((theme: Theme) => ({
    root: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.background.default,
        height: '100%',
    },
    main: {
        display: 'flex',
        flexDirection: 'column',
        height: 500,
        width: 600,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.palette.background.paper,
        borderRadius: 80,
        boxShadow: `0 0 ${theme.spacing(0.5)} 2px ${theme.palette.warning.main}`,
        [theme.breakpoints.down('sm')]: {
            height: 250,
            width: 300,
            borderRadius: 50,
        },
    },
    logo: {
        marginBottom: theme.spacing(6),
    },
    reloadButton: {
        marginTop: theme.spacing(3),
    },
}));

export default AppError;
