import { FC, useEffect, useState, MouseEvent } from 'react';
import { Box, Button, TextField, Theme } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { useSetUserPasswordMutation, useUpdateUserPasswordMutation } from '@/redux/features/user';
import { LockOutlined } from '@mui/icons-material';
import { Digital } from 'react-activity';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

interface ManagePasswordProps {
    hasPassword: boolean;
    expandedMenu: Dispatch<SetStateAction<string | false>>;
}

const ManagePassword: FC<ManagePasswordProps> = ({ hasPassword, expandedMenu }) => {
    const { classes } = useStyles();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [currentPassword, setCurrentPassword] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
    const [currentPasswordError, setCurrentPasswordError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');
    const [updatePassword, { isLoading: loadingPass, isSuccess: successPass, error: errorPass }] =
        useUpdateUserPasswordMutation();
    const [setNewPassword, { isLoading: loadingNewPass, isSuccess: successNewPass, error: errorNewPass }] =
        useSetUserPasswordMutation();
    const isLoading = loadingPass || loadingNewPass;

    const handleEmailForm = async (e: MouseEvent) => {
        e.preventDefault();
        setCurrentPasswordError('');
        setPasswordError('');

        if (!hasPassword) {
            setNewPassword({
                password,
                password_confirmation: passwordConfirmation,
            });
            return;
        }

        updatePassword({
            current_password: currentPassword,
            password,
            password_confirmation: passwordConfirmation,
        });
    };

    useEffect(() => {
        if (successPass || successNewPass) {
            expandedMenu(false);
        }
    }, [successPass, successNewPass]);

    useEffect(() => {
        const theError = errorPass ?? errorNewPass;
        if (theError) {
            const response = 'data' in theError ? theError.data : JSON.stringify(theError);
            const data = response as UpdatePasswordResponse;
            setCurrentPasswordError(data.errors?.current_password ? data.errors.current_password[0] : '');
            setPasswordError(data.errors?.password ? data.errors.password.join(' ') : '');
        }
    }, [errorPass, errorNewPass]);

    return (
        <div className={classes.formRoot}>
            <Box component={'form'} className={classes.sectionForm}>
                {hasPassword && (
                    <TextField
                        disabled={isLoading}
                        error={!!currentPasswordError.length}
                        helperText={currentPasswordError.length ? currentPasswordError : ''}
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
                )}
                <TextField
                    disabled={isLoading}
                    error={!!passwordError.length}
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
                    disabled={isLoading}
                    error={!!passwordError.length}
                    helperText={passwordError.length ? passwordError : ''}
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
                <Button
                    fullWidth={true}
                    disabled={isLoading}
                    onClick={handleEmailForm}
                    variant={'contained'}
                    color={'secondary'}
                >
                    {hasPassword ? 'Update' : 'Set'}
                    {isLoading && <Digital style={{ marginLeft: 5, marginBottom: 5, fontSize: 15 }} />}
                </Button>
            </Box>
        </div>
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

export default ManagePassword;
