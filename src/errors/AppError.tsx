import { makeStyles } from 'tss-react/mui';
import { Button, Theme, Typography } from '@mui/material';
import { FallbackProps } from 'react-error-boundary';
import { FC } from 'react';

const AppError: FC<FallbackProps> = (_props) => {
    const { classes } = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.main}>
                <img className={classes.logo} src={'images/logo.png'} height={'10%'} alt={'oops'} />
                <Typography variant={'h6'}>Something Went Wrong</Typography>
                <Button className={classes.reloadButton} variant={'contained'} onClick={() => window.location.reload()}>
                    Reload
                </Button>
            </div>
        </div>
    );
};

const useStyles = makeStyles()((theme: Theme) => ({
    root: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        color: '#ffffff',
        backgroundColor: theme.palette.background.default,
    },
    main: {
        display: 'flex',
        flexDirection: 'column',
        height: 500,
        width: 600,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1b1b1b',
        borderRadius: 80,
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
