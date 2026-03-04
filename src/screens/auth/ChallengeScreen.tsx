import { FC, KeyboardEvent, useEffect, useMemo, useRef, useState } from 'react';
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Chip,
    Divider,
    Paper,
    Stack,
    TextField,
    Theme,
    Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useConfirm2FAChallengeMutation } from '@/redux/features/authApi';
import { makeStyles } from 'tss-react/mui';
import { EnhancedEncryption } from '@mui/icons-material';
import { Spinner } from 'react-activity';
import OtpInput from '@/components/Users/Settings/OtpInput';

type ChallengeProps = {
    onSuccess: () => void;
    onCancel: () => void;
};

const ChallengeScreen: FC<ChallengeProps> = ({ onSuccess, onCancel }) => {
    const theme = useTheme();
    const { classes } = useStyles(theme)();
    const [challenge, { isLoading, isSuccess, error, reset }] = useConfirm2FAChallengeMutation();
    const recoveryRef = useRef<HTMLInputElement | null | undefined>(null);
    const [codeError, setCodeError] = useState<string | null>(null);
    const elmId = useMemo(() => Date.now(), []);

    const handleRecovery = () => {
        if (!recoveryRef.current?.value?.length) {
            return;
        }

        challenge({
            recovery_code: recoveryRef.current.value,
        });
        setCodeError(null);
    };

    const handleRecoveryKeyDown = (e: KeyboardEvent<HTMLDivElement>): void => {
        e.key === 'Enter' && handleRecovery();
    };

    const handleCode = (code: string) => {
        challenge({ code });
        setCodeError(null);
    };

    const cancelChallenge = () => {
        setCodeError(null);
        reset();
        onCancel();
    };

    useEffect(() => {
        if (isSuccess) {
            onSuccess();
        }
    }, [isSuccess]);

    useEffect(() => {
        if (error) {
            const response = error as LoginError;

            setCodeError(response.data.message);
        }
    }, [error]);

    return (
        <div className={classes.root} data-testid={'challengeRoot'}>
            <Paper className={classes.formRoot}>
                <div className={classes.header}>
                    <Typography variant={'h4'}>
                        <EnhancedEncryption style={{ fontSize: 25 }} /> Two-factor verification:
                    </Typography>
                </div>
                <Stack>
                    {codeError && (
                        <div style={{ display: 'flex', flex: 1, justifyContent: 'center', marginBottom: 12 }}>
                            <Chip label={codeError} color={'error'} variant={'outlined'} size={'small'} />
                        </div>
                    )}
                    <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
                        <Card elevation={0} sx={{ width: '350px !important' }}>
                            <CardHeader
                                sx={{ p: 2 }}
                                title={'Two-factor Code:'}
                                titleTypographyProps={{
                                    variant: 'caption',
                                }}
                            />
                            <CardContent sx={{ pt: 0 }}>
                                <OtpInput {...{ onComplete: handleCode }} />
                            </CardContent>
                        </Card>
                    </div>
                    <Divider sx={{ my: 3, width: '100%' }}>
                        <Chip label={'Or'} />
                    </Divider>
                    <TextField
                        disabled={isLoading || isSuccess}
                        inputRef={recoveryRef}
                        id={`recovery-code-${elmId}`}
                        type={'text'}
                        label={'Recovery Code'}
                        hiddenLabel
                        fullWidth
                        variant={'outlined'}
                        color={'primary'}
                        size={'small'}
                        style={{ marginBottom: 15 }}
                        onKeyDown={handleRecoveryKeyDown}
                    />
                    <Button
                        disabled={isLoading || isSuccess}
                        fullWidth={true}
                        data-testid={'challengeSubmitButton'}
                        onClick={handleRecovery}
                        variant={'contained'}
                        type={'submit'}
                        color={'secondary'}
                        startIcon={isLoading || isSuccess ? <Spinner /> : <EnhancedEncryption />}
                        sx={{ mt: 2 }}
                    >
                        Verify
                    </Button>
                    <Button
                        disabled={isLoading || isSuccess}
                        fullWidth={true}
                        onClick={cancelChallenge}
                        variant={'contained'}
                        type={'submit'}
                        color={'inherit'}
                        sx={{ mt: 2 }}
                    >
                        Cancel
                    </Button>
                </Stack>
            </Paper>
        </div>
    );
};

const useStyles = (theme: Theme) =>
    makeStyles()({
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
    });

export default ChallengeScreen;
