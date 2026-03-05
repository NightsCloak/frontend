import { FC, useEffect, useState } from 'react';
import EnableTwoFactor from '@/components/Users/Settings/EnableTwoFactor';
import {
    Alert,
    AlertTitle,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Stack,
    TextField,
    Theme,
    Typography,
} from '@mui/material';
import {
    useDisable2FAMutation,
    useGet2FARecoveryCodesMutation,
    useRegenerate2FARecoveryCodesMutation,
} from '@/redux/features/user';
import { makeStyles } from 'tss-react/mui';
import { Autorenew, CheckCircle, ContentCopy, LockOutlined, NoEncryption, Visibility } from '@mui/icons-material';
import { Digital } from 'react-activity';

interface ManageTwoFactorProps {
    user: User;
}

const ManageTwoFactor: FC<ManageTwoFactorProps> = ({ user }) => {
    const { classes } = useStyles();
    const [showEnable, setShowEnable] = useState<boolean>(!user.has_2fa_enabled);
    const [currentPassword, setCurrentPassword] = useState<string>('');
    const [codes, setCodes] = useState<string[] | null>(null);
    const [wasCopied, setWasCopied] = useState<boolean>(false);
    const [currentPasswordError, setCurrentPasswordError] = useState<string | undefined>(undefined);
    const [
        disable,
        { isSuccess: disableSuccess, isLoading: disableLoading, error: disableError, reset: resetDisable },
    ] = useDisable2FAMutation();
    const [viewCodes, { data: codesResponse, isLoading: viewLoading, error: viewError, reset: resetView }] =
        useGet2FARecoveryCodesMutation();
    const [remakeCodes, { data: remakeResponse, isLoading: remakeLoading, error: remakeError, reset: resetRemake }] =
        useRegenerate2FARecoveryCodesMutation();
    const disabled = disableLoading || viewLoading || remakeLoading;

    const handleDisable = () => {
        setCurrentPasswordError(undefined);
        disable({ current_password: currentPassword });
    };

    const handleView = () => {
        setCurrentPasswordError(undefined);
        viewCodes({ current_password: currentPassword });
    };

    const handleRegenerate = () => {
        setCurrentPasswordError(undefined);
        remakeCodes({ current_password: currentPassword });
    };

    const handleCopy = () => {
        if (!codes) {
            return;
        }

        navigator.clipboard.writeText(codes.join('\r\n'));
        setWasCopied(true);
    };

    useEffect(() => {
        if (disableError || viewError || remakeError) {
            const err = (disableError ?? viewError ?? remakeError) as BasicError;
            setCurrentPasswordError(err.data.message);
        }
    }, [disableError, viewError, remakeError]);

    useEffect(() => {
        if (disableSuccess) {
            resetDisable();
            setCurrentPassword('');
            setCodes(null);
            setShowEnable(true);
        }
    }, [disableSuccess]);

    useEffect(() => {
        if (codesResponse) {
            resetView();
            setCurrentPassword('');
            setCodes(codesResponse);
        }
    }, [codesResponse]);

    useEffect(() => {
        if (remakeResponse) {
            resetRemake();
            setCurrentPassword('');
            setCodes(remakeResponse);
        }
    }, [remakeResponse]);

    useEffect(() => {
        if (wasCopied) {
            const copiedTimeout = setTimeout(() => setWasCopied(false), 1500);

            return () => {
                copiedTimeout && clearTimeout(copiedTimeout);
            };
        }
    }, [wasCopied]);

    if (showEnable) {
        return <EnableTwoFactor {...{ onClose: () => setShowEnable(false) }} />;
    }

    return (
        <>
            <Stack spacing={2}>
                <Alert sx={{ mb: 2 }} severity={'success'}>
                    <AlertTitle>Your account is protected with two-factor authentication.</AlertTitle>
                    You must enter your password to view or make changes to your two-factor authentication settings.
                </Alert>
                <div className={classes.formRoot}>
                    <Box className={classes.sectionForm}>
                        <TextField
                            disabled={disableLoading}
                            error={!!currentPasswordError}
                            helperText={currentPasswordError}
                            required
                            id={'current_password'}
                            type={'password'}
                            label={'Current Password'}
                            hiddenLabel
                            fullWidth
                            variant={'outlined'}
                            autoComplete={'current-password'}
                            color={'primary'}
                            size={'small'}
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            style={{ marginBottom: 15 }}
                            InputProps={{
                                endAdornment: <LockOutlined style={{ marginLeft: 10 }} />,
                            }}
                        />
                        <Button
                            startIcon={disableLoading ? <Digital /> : <NoEncryption />}
                            fullWidth={true}
                            disabled={disabled}
                            onClick={handleDisable}
                            variant={'contained'}
                            color={'error'}
                        >
                            Disable Two-factor
                        </Button>
                        <Divider sx={{ marginY: 2, width: '100%' }}>
                            <Typography variant={'caption'}>Recovery Codes</Typography>
                        </Divider>
                        <Stack direction={'row'} spacing={1} width={'100%'}>
                            <Button
                                startIcon={viewLoading ? <Digital /> : <Visibility />}
                                fullWidth={true}
                                disabled={disabled}
                                onClick={handleView}
                                variant={'contained'}
                                color={'info'}
                            >
                                View
                            </Button>
                            <Button
                                startIcon={remakeLoading ? <Digital /> : <Autorenew />}
                                fullWidth={true}
                                disabled={disabled}
                                onClick={handleRegenerate}
                                variant={'contained'}
                                color={'secondary'}
                            >
                                Regenerate
                            </Button>
                        </Stack>
                    </Box>
                </div>
            </Stack>
            {codes && (
                <Dialog
                    PaperProps={{
                        elevation: 0,
                    }}
                    open={true}
                    fullWidth={true}
                    maxWidth={'sm'}
                >
                    <DialogTitle>Recovery Codes:</DialogTitle>
                    <DialogContent dividers={true}>
                        <ul>
                            {codes.map((code, i) => (
                                <li key={i}>
                                    <Typography variant={'h6'}>{code}</Typography>
                                </li>
                            ))}
                        </ul>
                    </DialogContent>
                    <DialogActions>
                        <Button variant={'contained'} color={'inherit'} onClick={() => setCodes(null)}>
                            Close
                        </Button>
                        <Button
                            startIcon={wasCopied ? <CheckCircle /> : <ContentCopy />}
                            variant={'contained'}
                            color={'info'}
                            onClick={handleCopy}
                        >
                            {wasCopied ? 'Copied' : 'Copy'}
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </>
    );
};

const useStyles = makeStyles()((theme: Theme) => ({
    spinnerRoot: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    formRoot: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

    sectionForm: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.up('sm')]: {
            width: '75%',
        },
        '& .MuiFormControl-root': {
            borderRadius: 4,
        },
    },
}));

export default ManageTwoFactor;
