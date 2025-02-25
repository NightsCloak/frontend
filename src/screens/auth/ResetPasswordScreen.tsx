import { FC, MouseEventHandler, useEffect, useRef, useState } from 'react';
import { Box, Button, Paper, TextField, Theme, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { useResetPasswordMutation } from '@/redux/features/auth';
import { Key, Login as LoginIcon } from '@mui/icons-material';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Sentry } from 'react-activity';
import PersonOutlined from '@mui/icons-material/PersonOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useTools } from '@/contexts/ToolsContext';

const ResetPasswordScreen: FC = () => {
    const navigate = useNavigate();
    const { token } = useParams() as { token: string };
    const [searchParams] = useSearchParams();
    const { classes, theme } = useStyles();
    const { updateTabTitle } = useTools();
    const emailRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const passwordConfirmRef = useRef<HTMLInputElement | null>(null);
    const [emailError, setEmailError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [passwordConfirmationError, setPasswordConfirmationError] = useState<string | null>(null);
    const [passwordVisible, setPasswordVisible] = useState(false);

    const [submit, { isLoading, isSuccess, error }] = useResetPasswordMutation();

    const handleSubmit: MouseEventHandler = () => {
        if (!emailError && !passwordError && !passwordConfirmationError) {
            submit({
                token,
                email: emailRef.current?.value ?? '',
                password: passwordRef.current?.value ?? '',
                password_confirmation: passwordConfirmRef.current?.value ?? '',
            });
        }
    };

    const checkEmail = () => {
        if (emailRef.current?.value) {
            // console.log('email', emailRef.current?.value);
            setEmailError(null);
            return;
        }
        setEmailError('Email should not be empty');
    };

    const checkPassword = (confirmation?: boolean) => {
        confirmation && passwordRef.current?.value !== passwordConfirmRef.current?.value
            ? setPasswordConfirmationError('Passwords do not match.')
            : passwordConfirmationError && setPasswordConfirmationError(null);
        if (passwordRef.current?.value) {
            setPasswordError(null);
            return;
        }
        !passwordConfirmRef.current?.value && setPasswordConfirmationError('Confirm Password cannot be empty');
        setPasswordError('Password cannot be empty');
    };

    //Check if data has errors and display them
    useEffect(() => {
        if (error) {
            const response = 'data' in error ? error.data : JSON.stringify(error);
            const data = response as ResetPasswordResponse;
            // console.log('response', response);
            if (data.errors?.email) {
                setEmailError(data.errors.email[0]);
            }
            if (data.errors?.password) {
                setPasswordError(data.errors.password[0]);
                setPasswordConfirmationError(data.errors.password[0]);
            }
        }
    }, [error]);

    useEffect(() => {
        updateTabTitle('Reset Password');
    }, []);

    if (isSuccess) {
        return (
            <div className={classes.root}>
                <Paper className={classes.formRoot}>
                    <div className={classes.header}>
                        <Typography variant={'h4'}>
                            <Key style={{ fontSize: 25 }} /> Password Reset!
                        </Typography>
                    </div>
                    <Typography style={{ margin: theme.spacing(3) }} variant={'body1'}>
                        Your password has been reset. You may now log in using your new password.
                    </Typography>
                    <Button
                        fullWidth={true}
                        onClick={() => navigate('/login')}
                        variant={'contained'}
                        color={'secondary'}
                        style={{
                            marginTop: theme.spacing(2),
                        }}
                    >
                        <LoginIcon style={{ marginRight: 5 }} /> Login
                    </Button>
                </Paper>
            </div>
        );
    }

    return (
        <div className={classes.root}>
            <Paper className={classes.formRoot}>
                <div className={classes.header}>
                    <Typography variant={'h4'}>
                        <Key style={{ fontSize: 25 }} /> Reset Password
                    </Typography>
                </div>
                {isLoading ? (
                    <div className={classes.spinner}>
                        <Sentry size={40} />
                    </div>
                ) : (
                    <>
                        <Box component={'form'} className={classes.resetForm}>
                            <TextField
                                inputRef={emailRef}
                                error={!!emailError}
                                helperText={emailError}
                                required
                                id={'email'}
                                type={'email'}
                                label={'Email'}
                                hiddenLabel
                                fullWidth
                                variant={'outlined'}
                                autoComplete={'email'}
                                color={'primary'}
                                size={'small'}
                                onChange={checkEmail}
                                onBlur={checkEmail}
                                style={{ marginBottom: 15 }}
                                InputProps={{
                                    defaultValue: searchParams.get('email') ?? '',
                                    endAdornment: <PersonOutlined style={{ marginLeft: 10 }} />,
                                }}
                            />
                            <TextField
                                inputRef={passwordRef}
                                error={!!passwordError}
                                helperText={passwordError}
                                required
                                id={'password'}
                                type={!passwordVisible ? 'password' : 'text'}
                                label={'Enter Password'}
                                hiddenLabel
                                fullWidth
                                variant={'outlined'}
                                autoComplete={'new-password'}
                                color={'primary'}
                                size={'small'}
                                onChange={() => checkPassword()}
                                onBlur={() => checkPassword()}
                                style={{ marginBottom: 15 }}
                                InputProps={{
                                    endAdornment: !passwordVisible ? (
                                        <VisibilityIcon
                                            style={{ marginLeft: 10 }}
                                            onClick={() => setPasswordVisible(!passwordVisible)}
                                        />
                                    ) : (
                                        <VisibilityOffIcon
                                            style={{ marginLeft: 10 }}
                                            onClick={() => setPasswordVisible(!passwordVisible)}
                                        />
                                    ),
                                }}
                            />
                            <TextField
                                inputRef={passwordConfirmRef}
                                error={!!passwordConfirmationError}
                                helperText={passwordConfirmationError}
                                required
                                id={'password_confirmation'}
                                type={!passwordVisible ? 'password' : 'text'}
                                label={'Confirm Password'}
                                hiddenLabel
                                fullWidth
                                variant={'outlined'}
                                autoComplete={'new-password'}
                                color={'primary'}
                                size={'small'}
                                onChange={() => checkPassword(true)}
                                onBlur={() => checkPassword(true)}
                                style={{ marginBottom: 15 }}
                                InputProps={{
                                    endAdornment: !passwordVisible ? (
                                        <VisibilityIcon
                                            style={{ marginLeft: 10 }}
                                            onClick={() => setPasswordVisible(!passwordVisible)}
                                        />
                                    ) : (
                                        <VisibilityOffIcon
                                            style={{ marginLeft: 10 }}
                                            onClick={() => setPasswordVisible(!passwordVisible)}
                                        />
                                    ),
                                }}
                            />
                            <Button
                                fullWidth={true}
                                onClick={handleSubmit}
                                type={'submit'}
                                variant={'contained'}
                                color={'secondary'}
                                style={{
                                    marginTop: theme.spacing(2),
                                }}
                            >
                                Submit
                            </Button>
                        </Box>
                    </>
                )}
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
    resetForm: {
        flexGrow: 1,
        display: 'flex',
        marginTop: theme.spacing(3),
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        '& .MuiFormControl-root': {
            borderRadius: 4,
        },
    },
}));

export default ResetPasswordScreen;
