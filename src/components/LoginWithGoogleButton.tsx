import { FC } from 'react';
import { Button } from '@mui/material';
import { Google } from '@mui/icons-material';

type LoginWithGoogleButtonProps = {
    title?: string;
};

const LoginWithGoogleButton: FC<LoginWithGoogleButtonProps> = ({ title }) => {

    const redirect = () => {
        window.location.href = '/oauth/social/google/redirect';
    }

    return (
        <Button
            startIcon={<Google />}
            onClick={redirect}
            variant={'contained'}
            type={'submit'}
            color={'secondary'}
        >
            {title ?? 'Login with Google'}
        </Button>
    );
};

export default LoginWithGoogleButton;
