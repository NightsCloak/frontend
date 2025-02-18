import { Button, Dialog, DialogActions, DialogContent, Stack } from '@mui/material';
import { FC, useState } from 'react';
import { Login, PersonAdd } from '@mui/icons-material';
import RegisterScreen from '@/layout/screens/RegisterScreen';
import LoginScreen from '@/layout/screens/LoginScreen';

type AuthDialogProps = {
    onLogin: () => void;
};

const AuthDialog: FC<AuthDialogProps> = ({ onLogin }) => {
    const [form, setForm] = useState<'Register' | 'Login' | null>(null);

    return (
        <>
            <Stack sx={{ display: 'flex', flex: 1 }} marginTop={2} spacing={1} direction={'row'}>
                <Button
                    fullWidth={true}
                    onClick={() => setForm('Login')}
                    startIcon={<Login />}
                    component={'span'}
                    color={'inherit'}
                    size={'small'}
                    variant={'contained'}
                    aria-label={'Login'}
                >
                    Login
                </Button>
                <Button
                    fullWidth={true}
                    onClick={() => setForm('Register')}
                    startIcon={<PersonAdd />}
                    component={'span'}
                    color={'inherit'}
                    size={'small'}
                    variant={'contained'}
                    aria-label={'Signup'}
                >
                    Signup
                </Button>
            </Stack>
            <Dialog
                PaperProps={{
                    elevation: 0,
                }}
                keepMounted={true}
                open={form !== null}
                fullWidth={true}
                maxWidth={'sm'}
                scroll={'paper'}
                onClose={() => setForm(null)}
            >
                <DialogContent dividers={true} sx={{ padding: 1 }}>
                    {form === 'Register' ? (
                        <RegisterScreen
                            {...{
                                login: () => setForm('Login'),
                                fullWidth: true,
                            }}
                        />
                    ) : (
                        <LoginScreen {...{ register: () => setForm('Register'), success: onLogin }} />
                    )}
                </DialogContent>
                <DialogActions>
                    <Button variant={'contained'} color={'inherit'} onClick={() => setForm(null)}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default AuthDialog;
