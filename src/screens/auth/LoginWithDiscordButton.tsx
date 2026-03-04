import { FC } from 'react';
import { Button } from '@mui/material';
import DiscordIcon from '@/components/Layout/Icons/DiscordIcon';
import { useAppDispatch } from '@/redux/hooks';
import { setRedirect } from '@/redux/reducers/authSlice';

type LoginWithDiscordButtonProps = {
    register?: boolean;
    code?: string;
};

const LoginWithDiscordButton: FC<LoginWithDiscordButtonProps> = ({ register, code }) => {
    const dispatch = useAppDispatch();

    const redirect = () => {
        dispatch(setRedirect(window.location.pathname));
        setTimeout(() => {
            window.location.href = `/oauth/social/discord/redirect?action=${register ? 'register' : 'login'}${register && code ? `&invite=${code}` : ''}`;
        }, 100);
    };

    return (
        <Button
            startIcon={<DiscordIcon />}
            onClick={redirect}
            variant={'contained'}
            type={'submit'}
            color={'secondary'}
        >
            Discord
        </Button>
    );
};

export default LoginWithDiscordButton;
