import { FC } from 'react';
import { Button } from '@mui/material';
import { Google } from '@mui/icons-material';
import { useAppDispatch } from '@/redux/hooks';
import { setRedirect } from '@/redux/reducers/authSlice';

type LoginWithGoogleButtonProps = {
    register?: boolean;
    code?: string;
};

const LoginWithGoogleButton: FC<LoginWithGoogleButtonProps> = ({ register, code }) => {
    const dispatch = useAppDispatch();

    const redirect = () => {
        dispatch(setRedirect(window.location.pathname));
        setTimeout(() => {
            window.location.href = `/oauth/social/google/redirect?action=${register ? 'register' : 'login'}${register && code ? `&invite=${code}` : ''}`;
        }, 100);
    };

    return (
        <Button startIcon={<Google />} onClick={redirect} variant={'contained'} type={'submit'} color={'secondary'}>
            Google
        </Button>
    );
};

export default LoginWithGoogleButton;
