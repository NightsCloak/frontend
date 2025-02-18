import React from 'react';
import { Box, Button, TextField, Theme } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { useUpdateUserEmailMutation } from '@/redux/features/user';
import { AlternateEmail, LockOutlined } from '@mui/icons-material';
import { Digital } from 'react-activity';

interface ManageEmailProps {
    expandedMenu: (setExpanded: boolean) => void;
}

const ManageEmail: React.FC<ManageEmailProps> = ({ expandedMenu }) => {
    const { classes } = useStyles();
    const [email, setEmail] = React.useState<string>('');
    const [currentPassword, setCurrentPassword] = React.useState<string>('');
    const [emailError, setEmailError] = React.useState<string>('');
    const [currentPasswordError, setCurrentPasswordError] = React.useState<string>('');
    const [updateEmail, { isLoading, isSuccess, error }] = useUpdateUserEmailMutation();

    const handleEmailForm = async (e: React.MouseEvent) => {
        e.preventDefault();
        setCurrentPasswordError('');
        setEmailError('');
        updateEmail({ email, current_password: currentPassword });
    };

    React.useEffect(() => {
        isSuccess && expandedMenu(false);
    }, [isSuccess, expandedMenu]);

    React.useEffect(() => {
        if (error) {
            const response = 'data' in error ? error.data : JSON.stringify(error);
            const data = response as UpdateEmailResponse;
            setCurrentPasswordError(data.errors?.current_password ? data.errors.current_password[0] : '');
            setEmailError(data.errors?.email ? data.errors.email[0] : '');
        }
    }, [error]);

    return (
        <div className={classes.formRoot}>
            <Box component={'form'} className={classes.sectionForm}>
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
                <TextField
                    disabled={isLoading}
                    error={!!emailError.length}
                    helperText={emailError.length ? emailError : ''}
                    required
                    id={'email'}
                    type={'email'}
                    label={'New Email'}
                    hiddenLabel
                    fullWidth
                    variant={'outlined'}
                    autoComplete={'email'}
                    color={'primary'}
                    size={'small'}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ marginBottom: 15 }}
                    InputProps={{
                        endAdornment: <AlternateEmail style={{ marginLeft: 10 }} />,
                    }}
                />
                <Button
                    fullWidth={true}
                    disabled={isLoading}
                    onClick={handleEmailForm}
                    variant={'contained'}
                    color={'secondary'}
                >
                    Update
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

export default ManageEmail;
