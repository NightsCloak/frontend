import { FC, useEffect, useState } from 'react';
import {
    Alert,
    Box,
    Button,
    Checkbox,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    Divider,
    FormControlLabel,
    Grid,
    Paper,
    Stack,
    TextField,
    Theme,
    Typography,
    useTheme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useHeartbeatQuery, useLoginMutation, useRegisterMutation } from '@/redux/features/auth';
import { makeStyles } from 'tss-react/mui';
import { AlternateEmail, CheckBox, CheckBoxOutlineBlank, PersonAdd } from '@mui/icons-material';
import { Sentry } from 'react-activity';
import PersonOutlined from '@mui/icons-material/PersonOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import TermsScreen from './TermsScreen';
import { useTools } from '@/contexts/ToolsContext';
import LoginWithGoogleButton from '@/components/LoginWithGoogleButton';
import Holding from '@/layout/Holding';
import { useAppDispatch } from '@/redux/hooks';

type RegisterProps = {
    login?: () => void;
    code?: string;
    invitedEmail?: string | null;
    onSuccess?: () => void;
    fullWidth?: boolean;
};

const RegisterScreen: FC<RegisterProps> = ({ login, code, invitedEmail, onSuccess: _onSuccess, fullWidth }) => {
    const theme = useTheme();
    const { classes } = useStyles();
    const navigate = useNavigate();

    // const firstRef = useRef<HTMLInputElement | null | undefined>();
    // const lastRef = useRef<HTMLInputElement | null | undefined>();
    // const emailRef = useRef<HTMLInputElement | null | undefined>();
    // const passwordRef = useRef<HTMLInputElement | null | undefined>();
    // const passwordConfirmRef = useRef<HTMLInputElement | null | undefined>();

    const [first, setFirst] = useState<string>('');
    const [last, setLast] = useState<string>('');
    const [email, setEmail] = useState<string>(invitedEmail ?? '');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
    const [firstErrorMsg, setFirstErrorMsg] = useState<string | null>(null);
    const [lastErrorMsg, setLastErrorMsg] = useState<string | null>(null);
    const [emailErrorMsg, setEmailErrorMsg] = useState<string | null>(null);
    const [termsAgreed, setTermsAgreed] = useState<boolean>(false);
    const [termsError, setTermsError] = useState<boolean>(false);
    const [termsModalOpen, setTermsModalOpen] = useState<boolean>(false);
    const [codeErrorMsg, setCodeErrorMsg] = useState<string | null>(null);
    const [passwordErrorMsg, setPasswordErrorMsg] = useState<string | null>(null);
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
    const [submit, { error, isLoading, isSuccess }] = useRegisterMutation();
    const [loginHook, { isSuccess: isLoginSuccess }] = useLoginMutation();
    const { data, isSuccess: isHeartbeatSuccess, refetch } = useHeartbeatQuery(undefined, { skip: !isLoginSuccess });
    const { updateTabTitle } = useTools();
    const dispatch = useAppDispatch();

    const resetErrors = () => {
        setFirstErrorMsg('');
        setLastErrorMsg('');
        setEmailErrorMsg('');
        setCodeErrorMsg('');
        setPasswordErrorMsg('');
        setTermsError(false);
    };

    const handleTermsModal = () => {
        setTermsAgreed(!termsAgreed);
        setTermsModalOpen(true);
    };

    const acceptTerms = () => {
        setTermsAgreed(!termsAgreed);
        setTermsError(false);
    };

    const gotoLogin = () => {
        if (login) {
            login();
            return;
        }
        navigate('/login');
    };

    const handleSubmit = () => {
        submit({
            first,
            last,
            email,
            code,
            terms: termsAgreed,
            password,
            password_confirmation: passwordConfirmation,
        });

        resetErrors();
    };

    useEffect(() => {
        isSuccess && loginHook({ email, password, remember: true });
    }, [isSuccess]);

    useEffect(() => {
        isLoginSuccess && refetch(); //trigger heartbeat
    }, [isLoginSuccess]);

    // if HB is success, update auth
    useEffect(() => {
        if (isHeartbeatSuccess && data.auth) {
            dispatch({ type: 'auth/setAuth', payload: data.auth });
            navigate('/home/account');
        }
    }, [isHeartbeatSuccess, data]);

    // useEffect(() => {
    //     if (email && emailRef.current) {
    //         emailRef.current.value = email;
    //     }
    // }, [email]);

    useEffect(() => {
        if (error) {
            const response = 'data' in error ? error.data : JSON.stringify(error);
            const data = response as RegisterResponse;
            if (data.errors) {
                setFirstErrorMsg(data.errors.first?.length ? data.errors.first[0] : '');
                setLastErrorMsg(data.errors.last?.length ? data.errors.last[0] : '');
                setEmailErrorMsg(data.errors.email?.length ? data.errors.email[0] : '');
                setCodeErrorMsg(data.errors.code?.length ? data.errors.code[0] : '');
                setPasswordErrorMsg(data.errors.password?.length ? data.errors.password[0] : '');
                setTermsError(!!data.errors?.terms);
            }
        }
    }, [error]);

    useEffect(() => {
        if (!fullWidth && !code) {
            updateTabTitle('Sign Up');
        }
    }, []);

    //string due to env limitations
    if (!code && import.meta.env.VITE_REG_OPEN !== 'true') {
        return (
            <Grid
                container
                sx={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                data-testid="registerRoot"
            >
                <Alert icon={false} severity={'info'} sx={{ justifyContent: 'center', width: 425 }}>
                    <Typography sx={{ color: 'info.main' }} variant={'h5'}>
                        Open registration is currently closed. You must have an invite to join.
                    </Typography>
                    <Button
                        sx={{ marginTop: 3 }}
                        color={'success'}
                        fullWidth={true}
                        onClick={() => navigate('/login')}
                        variant={'contained'}
                        type={'button'}
                    >
                        Login
                    </Button>
                </Alert>
            </Grid>
        );
    }

    if (isSuccess) {
        return <Holding />;
    }

    return (
        <>
            <Grid container className={classes.root} data-testid="registerRoot">
                <Grid item {...(fullWidth ? { xs: 12 } : { xs: 12, sm: 10, md: 6, lg: 4 })}>
                    <Paper className={classes.formRoot}>
                        <div className={classes.header}>
                            <Typography variant={'h4'}>
                                <PersonAdd style={{ fontSize: 25 }} /> Sign Up
                            </Typography>
                        </div>
                        {isLoading ? (
                            <div className={classes.spinner}>
                                <Sentry size={40} />
                            </div>
                        ) : (
                            <>
                                {!!codeErrorMsg && (
                                    <>
                                        <Alert
                                            icon={false}
                                            severity={'warning'}
                                            sx={{ justifyContent: 'center', padding: '0 !important' }}
                                        >
                                            <Typography sx={{ color: 'error.main' }} variant={'h5'}>
                                                {codeErrorMsg}
                                            </Typography>
                                        </Alert>
                                    </>
                                )}
                                <Box component={'form'} className={classes.registerForm}>
                                    <Stack width={'100%'} direction={'row'} spacing={1}>
                                        <TextField
                                            // inputRef={firstRef}
                                            error={!!firstErrorMsg}
                                            helperText={firstErrorMsg}
                                            required
                                            id={'first'}
                                            type={'text'}
                                            label={'First Name'}
                                            hiddenLabel
                                            fullWidth
                                            variant={'outlined'}
                                            autoComplete={'given-name'}
                                            color={'primary'}
                                            size={'small'}
                                            value={first}
                                            onChange={(e) => setFirst(e.target.value)}
                                            style={{ marginBottom: 15 }}
                                            InputProps={{
                                                endAdornment: <PersonOutlined />,
                                            }}
                                        />
                                        <TextField
                                            // inputRef={lastRef}
                                            error={!!lastErrorMsg}
                                            helperText={lastErrorMsg}
                                            required
                                            id={'last'}
                                            type={'text'}
                                            label={'Last Name'}
                                            hiddenLabel
                                            fullWidth
                                            variant={'outlined'}
                                            autoComplete={'family-name'}
                                            color={'primary'}
                                            size={'small'}
                                            value={last}
                                            onChange={(e) => setLast(e.target.value)}
                                            style={{ marginBottom: 15 }}
                                            InputProps={{
                                                endAdornment: <PersonOutlined />,
                                            }}
                                        />
                                    </Stack>
                                    <TextField
                                        // inputRef={emailRef}
                                        error={!!emailErrorMsg}
                                        helperText={emailErrorMsg}
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
                                        value={email}
                                        disabled={!!invitedEmail}
                                        onChange={(e) => setEmail(e.target.value)}
                                        style={{ marginBottom: 15 }}
                                        // InputProps={{ readOnly: true }}
                                        InputProps={{
                                            endAdornment: <AlternateEmail />,
                                            readOnly: !!invitedEmail,
                                        }}
                                    />
                                    <TextField
                                        // inputRef={passwordRef}
                                        error={!!passwordErrorMsg}
                                        helperText={passwordErrorMsg}
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
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
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
                                        // inputRef={passwordConfirmRef}
                                        error={!!passwordErrorMsg}
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
                                        value={passwordConfirmation}
                                        onChange={(e) => setPasswordConfirmation(e.target.value)}
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
                                    <FormControlLabel
                                        sx={{ color: termsError ? 'error.main' : undefined }}
                                        control={
                                            <Checkbox
                                                checked={termsAgreed}
                                                onClick={acceptTerms}
                                                icon={<CheckBoxOutlineBlank />}
                                                checkedIcon={<CheckBox />}
                                                color={'info'}
                                            />
                                        }
                                        label={
                                            <div className={classes.tac}>
                                                <Typography sx={{ display: 'inline' }}>Agree to our </Typography>
                                                <Typography
                                                    data-testid={'registerLink'}
                                                    onClick={handleTermsModal}
                                                    sx={{
                                                        display: 'inline',
                                                        color: (theme) => theme.palette.info.main,
                                                    }}
                                                    component={'span'}
                                                >
                                                    Terms of Use.
                                                </Typography>
                                            </div>
                                        }
                                    />
                                    {termsError && (
                                        <Typography sx={{ color: 'error.main' }} variant={'caption'}>
                                            You must agree to our Terms and Conditions.
                                        </Typography>
                                    )}
                                    <Button
                                        fullWidth={true}
                                        onClick={handleSubmit}
                                        variant={'contained'}
                                        type={'submit'}
                                        startIcon={<PersonAdd />}
                                        color={'secondary'}
                                        style={{
                                            marginTop: theme.spacing(2),
                                        }}
                                    >
                                        Sign Up
                                    </Button>
                                </Box>
                                <div className={classes.signUpText}>
                                    <Typography sx={{ display: 'inline' }}>Already have an account? </Typography>
                                    <Typography
                                        data-testid={'registerLink'}
                                        onClick={gotoLogin}
                                        sx={{ display: 'inline', color: (theme) => theme.palette.info.main }}
                                        component={'span'}
                                    >
                                        Log In
                                    </Typography>
                                </div>
                                <Divider sx={{ my: 3 }}>
                                    <Chip label={'Social Signup'} />
                                </Divider>
                                <Stack justifyContent={'center'} direction={'row'}>
                                    <LoginWithGoogleButton title={'Signup with Google'} />
                                </Stack>
                            </>
                        )}
                    </Paper>
                </Grid>
            </Grid>
            <Dialog
                PaperProps={{
                    elevation: 0,
                }}
                open={termsModalOpen}
                maxWidth={'md'}
            >
                <DialogContent>
                    <TermsScreen />
                </DialogContent>
                <DialogActions>
                    <Button variant={'contained'} color={'inherit'} onClick={() => setTermsModalOpen(false)}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
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
    registerForm: {
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
    tac: {
        '&>span': {
            cursor: 'pointer',
            '&:hover': {
                textDecoration: 'underline',
            },
        },
    },
    signUpText: {
        textAlign: 'center',
        paddingTop: theme.spacing(2),
        '&>span': {
            cursor: 'pointer',
            '&:hover': {
                textDecoration: 'underline',
            },
        },
    },
}));

export default RegisterScreen;
