import { FC, MouseEventHandler, useEffect, useRef, useState } from 'react';
import {
    Box,
    Button,
    Checkbox,
    Chip,
    Divider,
    FormControlLabel,
    Paper,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { useHeartbeatQuery, useLoginMutation } from '@/redux/features/authApi';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from 'tss-react/mui';
import { AlternateEmail, Login as LoginIcon } from '@mui/icons-material';
import { Sentry } from 'react-activity';
import LockOutlined from '@mui/icons-material/LockOutlined';
import { useAppSelector } from '@/redux/hooks';
import { useLocation } from 'react-router';
import { useTools } from '@/contexts/ToolsContext';
import LoginWithGoogleButton from '@/screens/auth/LoginWithGoogleButton';
import LoginDevButton from '@/screens/auth/LoginDevButton';
import ChallengeScreen from '@/screens/auth/ChallengeScreen';
import LoginWithDiscordButton from '@/screens/auth/LoginWithDiscordButton';

type LoginProps = {
    register?: () => void;
    success?: () => void;
};

const LoginScreen: FC<LoginProps> = ({ register, success }) => {
    const { classes, theme } = useStyles();
    const auth = useAppSelector((state) => state.auth);
    const location = useLocation();
    const navigate = useNavigate();
    const { updateTabTitle } = useTools();
    const [login, { isLoading, isSuccess, error, reset }] = useLoginMutation();
    const { data, isSuccess: isHeartbeatSuccess, refetch } = useHeartbeatQuery(undefined);
    const emailRef = useRef<HTMLInputElement | null | undefined>(null);
    const passwordRef = useRef<HTMLInputElement | null | undefined>(null);
    const rememberRef = useRef<HTMLInputElement | null>(null);
    const [emailError, setEmailError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [challenging, setChallenging] = useState<boolean>(false);
    const _error = error as LoginError | undefined;

    const resetErrors = () => {
        setEmailError(null);
        setPasswordError(null);
    };

    const handleSubmit: MouseEventHandler = (e) => {
        e.preventDefault();
        login({
            email: emailRef.current?.value ?? '',
            password: passwordRef.current?.value ?? '',
            remember: rememberRef.current?.checked,
        });
        resetErrors();
    };

    const cancelChallenge = () => {
        resetErrors();
        setChallenging(false);
        reset();
    };

    const gotoRegister = () => {
        if (register) {
            register();
            return;
        }
        navigate('/register');
    };

    // Login or challenge Success, session needs regenerating via heartbeat
    useEffect(() => {
        if (isSuccess) {
            refetch(); //trigger heartbeat
        }
    }, [isSuccess]);

    // if HB is success, update auth
    useEffect(() => {
        if (isHeartbeatSuccess && data.auth) {
            success && success();
        }
    }, [isHeartbeatSuccess, data]);

    useEffect(() => {
        if (_error) {
            if (_error.status === 400) {
                setChallenging(true);
                return;
            }

            if (_error.data.errors) {
                setEmailError(_error.data.errors.email?.length ? _error.data.errors.email[0] : null);
                setPasswordError(_error.data.errors.password?.length ? _error.data.errors.password[0] : null);
                return;
            }

            setEmailError(_error.data.message);
        }
    }, [_error]);

    useEffect(() => {
        !success && updateTabTitle('Login');
    }, []);

    useEffect(() => {
        if (import.meta.env.DEV && emailRef?.current && passwordRef.current) {
            emailRef.current.value = import.meta.env.VITE_DEV_USERNAME ?? '';
            passwordRef.current.value = import.meta.env.VITE_DEV_PASSWORD ?? '';
        }
    }, []);

    if (import.meta.env.VITE_AUTH_FLOW === 'pkce') {
        return (
            <div className={classes.root} data-testid={'loginRoot'}>
                <Paper className={classes.formRoot}>
                    <div className={classes.header}>
                        <Typography variant={'h4'}>
                            <LoginIcon style={{ fontSize: 25 }} /> Login
                        </Typography>
                        {location?.state?.redirect}
                    </div>
                    <LoginDevButton />
                </Paper>
            </div>
        );
    }

    if (_error?.status === 400 || challenging) {
        return <ChallengeScreen {...{ onSuccess: refetch, onCancel: cancelChallenge }} />;
    }

    return (
        <div className={classes.root} data-testid={'loginRoot'}>
            <Paper className={classes.formRoot}>
                <div className={classes.header}>
                    <Typography variant={'h4'}>
                        <LoginIcon style={{ fontSize: 25 }} /> Login
                    </Typography>
                    {location?.state?.redirect}
                </div>
                {isLoading || isSuccess || auth.status ? (
                    <div className={classes.spinner} data-testid={'loadingRoot'}>
                        <Sentry size={40} />
                    </div>
                ) : (
                    <>
                        <Box component={'form'} className={classes.loginForm} data-testid={'loginForm'}>
                            <TextField
                                inputRef={emailRef}
                                error={!!emailError}
                                helperText={emailError}
                                required
                                id={'username'}
                                type={'email'}
                                label={'Email'}
                                hiddenLabel
                                fullWidth
                                variant={'outlined'}
                                autoComplete={'email'}
                                color={'primary'}
                                size={'small'}
                                style={{ marginBottom: 15 }}
                                InputProps={{
                                    endAdornment: <AlternateEmail />,
                                    inputProps: {
                                        'data-testid': 'usernameInput',
                                    },
                                }}
                            />
                            <TextField
                                inputRef={passwordRef}
                                error={!!passwordError}
                                helperText={passwordError}
                                required
                                id={'password'}
                                type={'password'}
                                label={'Password'}
                                hiddenLabel
                                fullWidth
                                variant={'outlined'}
                                autoComplete={'current-password'}
                                color={'primary'}
                                size={'small'}
                                style={{ marginBottom: 15 }}
                                InputProps={{
                                    endAdornment: <LockOutlined />,
                                    inputProps: {
                                        'data-testid': 'passwordInput',
                                    },
                                }}
                            />
                            <div className={classes.options}>
                                <FormControlLabel
                                    inputRef={rememberRef}
                                    label={'Remember Me?'}
                                    control={<Checkbox />}
                                />
                                <Typography
                                    className={classes.optionsText}
                                    onClick={() => navigate('/password/forgot')}
                                >
                                    Forgot Password?
                                </Typography>
                            </div>
                            <Button
                                fullWidth={true}
                                data-testid={'loginSubmitButton'}
                                onClick={handleSubmit}
                                variant={'contained'}
                                type={'submit'}
                                color={'secondary'}
                                startIcon={<LoginIcon />}
                                style={{
                                    marginTop: theme.spacing(3),
                                }}
                            >
                                Login
                            </Button>
                        </Box>
                        <div className={classes.signUpText}>
                            <Typography sx={{ display: 'inline' }}>Don&apos;t have an account? </Typography>
                            <Typography
                                data-testid={'registerLink'}
                                onClick={gotoRegister}
                                sx={{ display: 'inline', color: (theme) => theme.palette.info.main }}
                                component={'span'}
                            >
                                Sign Up!
                            </Typography>
                        </div>
                        <div className={classes.signUpText}>
                            <Typography sx={{ display: 'inline' }}>Account verification? </Typography>
                            <Typography
                                onClick={() => navigate('/email/verify/resend')}
                                sx={{ display: 'inline', color: (theme) => theme.palette.info.main }}
                                component={'span'}
                            >
                                Resend email.
                            </Typography>
                        </div>
                        <Divider sx={{ my: 3 }}>
                            <Chip label={<Typography>Login With</Typography>} />
                        </Divider>
                        <Stack spacing={1} justifyContent={'center'} direction={'row'}>
                            <LoginWithGoogleButton />
                            <LoginWithDiscordButton />
                        </Stack>
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
            width: 600,
            [theme.breakpoints.down('sm')]: {
                width: '90%',
            },
        },
    },
    spinner: {
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center',
        minHeight: 24,
        marginBottom: theme.spacing(1),
    },
    formRoot: {
        flexDirection: 'column',
        justifyContent: 'center',
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
    loginForm: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: theme.spacing(2),
        '& .MuiFormControl-root': {
            borderRadius: 4,
        },
    },
    signUpText: {
        textAlign: 'center',
        marginTop: theme.spacing(1),
        '&>span': {
            cursor: 'pointer',
            '&:hover': {
                textDecoration: 'underline',
            },
        },
    },
    options: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
    },
    optionsText: {
        color: theme.palette.info.main,
        cursor: 'pointer',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
}));

export default LoginScreen;
