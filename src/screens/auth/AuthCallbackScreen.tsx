import { useEffect } from 'react';
import { Spinner } from 'react-activity';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGetTokenMutation } from '@/redux/features/auth';
import { useAppSelector } from '@/redux/hooks';

const AuthCallbackScreen = () => {
    const [params] = useSearchParams();
    const [getToken, getTokenStatus] = useGetTokenMutation();
    const auth = useAppSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        const code = params.get('code');
        const state = params.get('state');
        if (
            code &&
            !getTokenStatus.isLoading &&
            getTokenStatus.isUninitialized &&
            state === auth.pkce.challenge_state
        ) {
            getToken({ code, code_verifier: auth.pkce.challenge.codeVerifier })
                .unwrap()
                .catch((_e) => {});
        } else {
            navigate('/login');
        }
    }, [params]);

    useEffect(() => {
        console.log('token', getTokenStatus);
    }, [getTokenStatus]);

    return (
        <div>
            Please Wait <br /> <Spinner />
        </div>
    );
};

export default AuthCallbackScreen;
