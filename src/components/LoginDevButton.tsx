import { Button } from '@mui/material';
import { MouseEventHandler, useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import pkceChallenge from 'pkce-challenge';
import { updatePKCE } from '@/redux/reducers/authSlice';
import randomString from '@/utils/randomString';
import generateAuthQuery from '@/utils/generateAuthQuery';

const LoginDevButton = () => {
    const auth = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    const challenge_state = useMemo(() => randomString(40), []);
    const queryString = generateAuthQuery(auth);

    const onClick: MouseEventHandler = () => {
        const url = `https://${import.meta.env.VITE_URI}/oauth/authorize?${queryString}`;
        console.log('url', url);
        window.location.assign(url);
    };

    useEffect(() => {
        const updateChallenge = async () => {
            const challenge = await pkceChallenge();
            dispatch(
                updatePKCE({
                    challenge: { codeVerifier: challenge.code_verifier, codeChallenge: challenge.code_challenge },
                    challenge_state,
                })
            );
            console.log('challenge', challenge);
        };

        updateChallenge();
        return () => {};
    }, []);

    return (
        <>
            <Button color={'secondary'} variant={'contained'} onClick={onClick} fullWidth>
                Login With {import.meta.env.VITE_URI}
            </Button>
        </>
    );
};

export default LoginDevButton;
