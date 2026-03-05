import { FC, useEffect, useState, MouseEvent } from 'react';
import { Alert, AlertTitle, Box, Button, Stack, TextField, Theme, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { useDeleteUserAccountMutation } from '@/redux/features/user';
import { LockOutlined } from '@mui/icons-material';
import { Digital } from 'react-activity';
import authSlice from '@/redux/reducers/authSlice';
import { useAppDispatch } from '@/redux/hooks';
import { persistor } from '@/redux/store';

type DeleteAccountProps = {
    user: User;
};

const DeleteAccount: FC<DeleteAccountProps> = ({ user }) => {
    const { classes } = useStyles();
    const dispatch = useAppDispatch();
    const [currentPassword, setCurrentPassword] = useState<string>('');
    const [currentPasswordError, setCurrentPasswordError] = useState<string>('');
    const [deleteAccount, { isLoading, isSuccess, error }] = useDeleteUserAccountMutation();

    const handleDeleteForm = async (e: MouseEvent) => {
        e.preventDefault();
        setCurrentPasswordError('');
        deleteAccount({ current_password: currentPassword });
    };

    useEffect(() => {
        if (isSuccess) {
            dispatch(authSlice.actions.logout());
            persistor.purge();
            persistor.persist();
        }
    }, [isSuccess]);

    useEffect(() => {
        if (error) {
            const response = 'data' in error ? error.data : JSON.stringify(error);
            const data = response as DeleteAccountResponse;
            setCurrentPasswordError(data.errors?.current_password ? data.errors.current_password[0] : '');
        }
    }, [error]);

    return (
        <div className={classes.formRoot}>
            <Stack sx={{ width: '100%', marginBottom: (theme) => theme.spacing(2) }} spacing={2}>
                <Alert severity="error">
                    <AlertTitle>
                        {user.has_password
                            ? 'Confirm your password below to delete your account.'
                            : 'Confirm deleting your account?'}
                    </AlertTitle>
                    <Typography variant={'body2'}>
                        Your account will deactivated immediately. Once deactivated, it will be scheduled for purging,
                        which includes all data and files associated with it. Accounts can only be restored up to one
                        week after being deactivated by contacting our support team.
                    </Typography>
                </Alert>
            </Stack>
            <Box component={'form'} className={classes.sectionForm}>
                {user.has_password && (
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
                <Button
                    fullWidth={true}
                    disabled={isLoading}
                    onClick={handleDeleteForm}
                    variant={'contained'}
                    size={'large'}
                    color={'error'}
                >
                    Delete Account
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

export default DeleteAccount;
