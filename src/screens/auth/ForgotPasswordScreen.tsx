import { FC, useEffect, useRef, useState } from 'react';
import { Box, Button, Paper, TextField, Theme, Typography, useTheme } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { Sentry } from 'react-activity';
import { useForgotPasswordMutation } from '@intractinc/base/redux/features/auth';
import { AlternateEmail, Home, Key, MarkEmailRead } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useTools } from '@intractinc/base/contexts/ToolsContext';

const ForgotPasswordScreen: FC = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const { updateTabTitle } = useTools();
    const { classes } = useStyles();

    const emailRef = useRef<HTMLInputElement | undefined>(null!);
    const [emailError, setEmailError] = useState<string | null>(null);

    const [submit, { isLoading, isSuccess, error }] = useForgotPasswordMutation();
    const handleSubmit = () => {
        !!emailRef.current?.value && setEmailError('Email cannot be empty');
        if (emailRef.current?.value) {
            submit({ email: emailRef.current?.value });
        }
    };

    useEffect(() => {
        emailError && !!emailRef.current?.value && setEmailError(null);
    }, [emailError]);

    useEffect(() => {
        if (error) {
            const response = 'data' in error ? error.data : JSON.stringify(error);
            const data = response as ForgotPasswordResponse;
            if (data.message) {
                setEmailError(data.message);
            }
        }
    }, [error]);

    useEffect(() => {
        updateTabTitle('Forgot Password');
    }, []);

    if (isSuccess) {
        return (
            <div className={classes.root}>
                <Paper className={classes.formRoot}>
                    <div className={classes.header}>
                        <Typography variant={'h4'}>
                            <MarkEmailRead style={{ fontSize: 25 }} /> Email Sent!
                        </Typography>
                    </div>
                    <Typography style={{ margin: theme.spacing(3) }} variant={'body1'}>
                        Please check your email for instructions on completing your password reset request. The link
                        sent will only be valid for one hour.
                    </Typography>
                    <Button
                        fullWidth={true}
                        onClick={() => navigate('/')}
                        variant={'contained'}
                        color={'secondary'}
                        sx={{ marginTop: theme.spacing(2) }}
                    >
                        <Home style={{ marginRight: 5 }} /> Home
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
                        <Key style={{ fontSize: 25 }} /> Forgot Password?
                    </Typography>
                </div>
                {isLoading ? (
                    <div className={classes.spinner}>
                        <Sentry size={40} />
                    </div>
                ) : (
                    <>
                        <Typography style={{ margin: theme.spacing(3) }} variant={'subtitle1'}>
                            Enter your email below to proceed with resetting your password.
                        </Typography>
                        <Box component={'form'} className={classes.loginForm}>
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
                                style={{ marginBottom: 15 }}
                                InputProps={{
                                    endAdornment: <AlternateEmail style={{ marginLeft: 10 }} />,
                                }}
                            />
                            <Button
                                fullWidth={true}
                                onClick={handleSubmit}
                                variant={'contained'}
                                type={'submit'}
                                color={'secondary'}
                                style={{
                                    marginTop: theme.spacing(1),
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

    loginForm: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        '& .MuiFormControl-root': {
            borderRadius: 4,
        },
    },
}));

export default ForgotPasswordScreen;
