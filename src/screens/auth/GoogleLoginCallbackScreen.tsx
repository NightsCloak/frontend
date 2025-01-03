import { Alert, AlertTitle, Button, Paper, Stack, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { Sentry } from 'react-activity';
import { makeStyles } from 'tss-react/mui';
import { useGoogleLoginCallbackMutation, useHeartbeatQuery } from '@intractinc/base/redux/features/auth';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Google, Undo } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '@intractinc/base/redux/hooks';

const GoogleLoginCallbackScreen: FC = () => {
    const { classes } = useStyles();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [handleCallback, { error, isSuccess }] = useGoogleLoginCallbackMutation();
    const { data, isSuccess: isHeartbeatSuccess, refetch } = useHeartbeatQuery(undefined, { skip: !isSuccess });
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const auth = useAppSelector((state) => state.auth.status);

    useEffect(() => {
        if (auth) {
            navigate('/home', { replace: true });
            return;
        }

        const code = searchParams.get('code') ?? 'unknown';
        const state = searchParams.get('state') ?? 'unknown';

        handleCallback({ code, state });
    }, []);

    useEffect(() => {
        isSuccess && refetch();
    }, [isSuccess]);

    useEffect(() => {
        if (isHeartbeatSuccess && data.auth) {
            dispatch({ type: 'auth/setAuth', payload: data.auth });
        }
    }, [isHeartbeatSuccess, data]);

    useEffect(() => {
        if (error) {
            const response = error as BasicError;
            setErrorMessage(response.data.message);
        }
    }, [error]);

    return (
        <div className={classes.root}>
            <Paper className={classes.formRoot}>
                {errorMessage ? (
                    <>
                        <Alert severity={'warning'}>
                            <AlertTitle>{errorMessage}</AlertTitle>
                        </Alert>
                        <Button
                            sx={{ mt: 2 }}
                            fullWidth={true}
                            onClick={() => navigate('/login')}
                            size={'large'}
                            variant={'contained'}
                            color={'inherit'}
                            startIcon={<Undo />}
                        >
                            Back
                        </Button>
                    </>
                ) : (
                    <>
                        <div className={classes.header}>
                            <Stack spacing={1} display={'flex'} direction={'row'} alignItems={'center'}>
                                <Google sx={{ fontSize: 32 }} />
                                <Typography variant={'h4'}>Logging In...</Typography>
                            </Stack>
                        </div>
                        <div className={classes.spinner}>
                            <Sentry size={60} />
                        </div>
                    </>
                )}
            </Paper>
        </div>
    );
};

const useStyles = makeStyles()((theme) => ({
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
            minWidth: 400,
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
    spinner: {
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center',
    },
    formRoot: {
        [theme.breakpoints.down('sm')]: {
            width: '75%',
        },
    },
}));

export default GoogleLoginCallbackScreen;
