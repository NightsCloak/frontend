import { Button } from '@mui/material';
import { MouseEventHandler, useMemo } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { updatePKCE } from '@/redux/reducers/authSlice';
import randomString from '@/utils/randomString';
import generateAuthQuery from '@/utils/generateAuthQuery';
import generateCodeVerifier from '@/utils/generateCodeVerifier';
import generateCodeChallenge from '@/utils/generateCodeChallenge';

const LoginDevButton = () => {
    const dispatch = useAppDispatch();

    const challenge_state = useMemo(() => randomString(40), []);

    const updateChallenge = async () => {
        const verifier = generateCodeVerifier(43);
        const challenge = generateCodeChallenge(verifier);

        dispatch(
            updatePKCE({
                challenge: { codeVerifier: verifier, codeChallenge: challenge },
                challenge_state,
            })
        );
        console.log('challenge', verifier, challenge);
        return { codeVerifier: verifier, codeChallenge: challenge };
    };

    const onClick: MouseEventHandler = async () => {
        const { codeChallenge } = await updateChallenge();
        const queryString = generateAuthQuery(challenge_state, codeChallenge);
        const url = `https://${import.meta.env.VITE_URI}/oauth/authorize?${queryString}`;
        console.log('url', url);
        window.location.assign(url);
    };

    return (
        <>
            <Button variant={'contained'} onClick={onClick} fullWidth>
                Login With {import.meta.env.VITE_URI}
            </Button>
        </>
    );
};

export default LoginDevButton;
