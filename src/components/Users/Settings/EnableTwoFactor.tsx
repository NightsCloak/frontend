import { FC, KeyboardEvent, useEffect, useState } from 'react';
import {
    Alert,
    AlertTitle,
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    TextField,
    Theme,
    Typography,
} from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { useConfirm2FAMutation, useEnable2FAMutation } from '@/redux/features/user';
import { CheckCircle, ContentCopy, EnhancedEncryption, LockOutlined, Save } from '@mui/icons-material';
import { Digital, Spinner } from 'react-activity';
import OtpInput from '@/components/Users/Settings/OtpInput';

type EnableTwoFactorProps = {
    onClose: () => void;
};

const EnableTwoFactor: FC<EnableTwoFactorProps> = ({ onClose }) => {
    const { classes } = useStyles();
    const [currentPassword, setCurrentPassword] = useState<string>('');
    const [qrCode, setQrCode] = useState<string | null>(null);
    const [wasCopied, setWasCopied] = useState<boolean>(false);
    const [confirmCodes, setConfirmCodes] = useState<string[] | null>(null);
    const [currentPasswordError, setCurrentPasswordError] = useState<string | undefined>(undefined);
    const [confirmError, setConfirmError] = useState<string | undefined>(undefined);
    const [enable, { data, isLoading, error, reset: resetEnable }] = useEnable2FAMutation();
    const [confirm, { data: confirmed, isLoading: loadingConfirm, error: errorConfirm, reset: resetConfirm }] =
        useConfirm2FAMutation();

    const handleEnable = () => {
        setCurrentPasswordError(undefined);
        enable({ current_password: currentPassword });
    };

    const handleEnableKeyDown = (e: KeyboardEvent<HTMLDivElement>): void => {
        e.key === 'Enter' && handleEnable();
    };

    const handleConfirm = (code: string) => {
        setConfirmError(undefined);
        confirm({ code });
    };

    const handleClose = () => {
        setQrCode(null);
        setConfirmError(undefined);
        if (confirmCodes) {
            onClose();
            setConfirmCodes(null);
        }
    };

    const handleCopy = () => {
        if (!confirmCodes) {
            return;
        }

        navigator.clipboard.writeText(confirmCodes.join('\r\n'));
        setWasCopied(true);
    };

    useEffect(() => {
        if (data) {
            setQrCode(data.svg);
            setCurrentPasswordError(undefined);
            setCurrentPassword('');
            resetEnable();
        }
    }, [data]);

    useEffect(() => {
        if (error) {
            const err = error as BasicError;
            setCurrentPasswordError(err.data.message);
        }
    }, [error]);

    useEffect(() => {
        if (errorConfirm) {
            const err = errorConfirm as BasicError;
            setConfirmError(err.data.message);
        }
    }, [errorConfirm]);

    useEffect(() => {
        if (confirmed) {
            setQrCode(null);
            setConfirmCodes(confirmed);
            resetConfirm();
        }
    }, [confirmed]);

    useEffect(() => {
        if (wasCopied) {
            const copiedTimeout = setTimeout(() => setWasCopied(false), 1500);

            return () => {
                copiedTimeout && clearTimeout(copiedTimeout);
            };
        }
    }, [wasCopied]);

    return (
        <>
            <div className={classes.formRoot}>
                <Box className={classes.sectionForm}>
                    <TextField
                        disabled={isLoading}
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
                        onKeyDown={handleEnableKeyDown}
                    />
                    <Button
                        startIcon={isLoading ? <Digital /> : <EnhancedEncryption />}
                        fullWidth={true}
                        disabled={isLoading}
                        onClick={handleEnable}
                        variant={'contained'}
                        color={'secondary'}
                    >
                        Enable Two-factor
                    </Button>
                </Box>
            </div>
            {(qrCode || confirmCodes) && (
                <Dialog
                    PaperProps={{
                        elevation: 0,
                    }}
                    open={true}
                    fullWidth={true}
                    maxWidth={'sm'}
                >
                    <DialogTitle>{confirmCodes ? 'Two-factor Enabled' : 'Enabling two-factor'}</DialogTitle>
                    <DialogContent dividers={true}>
                        {confirmCodes ? (
                            <>
                                <Alert sx={{ mb: 2 }} severity={'success'}>
                                    <AlertTitle>
                                        You have successfully enabled two-factor authentication on your account!
                                    </AlertTitle>
                                    <Typography variant={'body2'}>
                                        Be sure to copy these recovery codes as a way to access your account should you
                                        loose access to your authenticator app.
                                    </Typography>
                                </Alert>
                                <ul>
                                    {confirmCodes.map((code, i) => (
                                        <li key={i}>
                                            <Typography variant={'h6'}>{code}</Typography>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        ) : (
                            <Stack spacing={3}>
                                <Alert sx={{ mb: 2 }} severity={'info'}>
                                    <AlertTitle>
                                        Scan and confirm the QR Code with your authenticator app of choice:
                                    </AlertTitle>
                                </Alert>
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                    dangerouslySetInnerHTML={{ __html: qrCode ?? '' }}
                                />
                                {confirmError && (
                                    <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
                                        <Chip
                                            label={confirmError}
                                            color={'error'}
                                            variant={'outlined'}
                                            size={'small'}
                                        />
                                    </div>
                                )}
                                <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
                                    <Card elevation={1} sx={{ width: 350 }}>
                                        <CardHeader
                                            sx={{ p: 2 }}
                                            title={'Confirm Code:'}
                                            titleTypographyProps={{
                                                variant: 'caption',
                                            }}
                                        />
                                        <CardContent sx={{ pt: 0 }}>
                                            <OtpInput {...{ onComplete: handleConfirm }} />
                                        </CardContent>
                                    </Card>
                                </div>
                                <Button
                                    startIcon={loadingConfirm ? <Spinner /> : <Save />}
                                    disabled={loadingConfirm}
                                    variant={'contained'}
                                    color={'secondary'}
                                    fullWidth={true}
                                >
                                    Confirm
                                </Button>
                            </Stack>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button disabled={loadingConfirm} variant={'contained'} color={'inherit'} onClick={handleClose}>
                            Close
                        </Button>
                        {confirmCodes && (
                            <Button
                                startIcon={wasCopied ? <CheckCircle /> : <ContentCopy />}
                                variant={'contained'}
                                color={'info'}
                                onClick={handleCopy}
                            >
                                {wasCopied ? 'Copied' : 'Copy'}
                            </Button>
                        )}
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

export default EnableTwoFactor;
