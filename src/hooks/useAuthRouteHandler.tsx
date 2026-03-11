import { useLocation, useMatch, useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setRedirect, setIntended } from '@/redux/reducers/authSlice';

const useAuthRouteHandler = () => {
    const auth = useAppSelector((state) => state.auth);
    const user = useAppSelector((state) => state.user as UserState);
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const matchRoute = useMatch('maintenance');

    const guestRoutes = [
        'waitList',
        'maintenance',
        'contact',
        'login',
        'register',
        'auth/callback',
        'password/forgot',
        'password/reset',
        'email/verify',
        'terms',
        'privacy',
        '/login/social/google/callback',
        '/login/social/discord/callback',
    ];

    const isGuestPath = useMemo(() => {
        return guestRoutes.some((route) => location.pathname.includes(route) || location.pathname === '/');
    }, [location]);

    const handleRedirect = (opt: { intended?: string | null; redirect?: string | null }) => {
        dispatch(setRedirect(null));
        dispatch(setIntended(null));

        if (opt.intended) {
            setTimeout(() => {
                window.location.href = opt.intended!;
            }, 100);
            return;
        }

        if (opt.redirect) {
            navigate(opt.redirect);
        }
    };

    //Handles
    useEffect(() => {
        const authCheck = ['/login', '/register', '/email/verify/resend', '/password/forgot'];
        const authCallback = [
            '/auth/callback',
            '/login/social/google/callback',
            '/login/social/discord/callback',
            '/login/social/slack/callback',
        ];
        const intended = searchParams.get('intended');

        if (intended) {
            searchParams.delete('intended');
            setSearchParams(searchParams, { replace: true });
            dispatch(setIntended(intended));
            return;
        }

        if (!auth.status) {
            !isGuestPath && navigate('/login');
            return;
        }

        if (auth.status && location.pathname === '/login') {
            navigate('/home');
            return;
        }
        if (
            user.data &&
            !user.data.is_verified &&
            location.pathname !== '/home/account' &&
            !location.pathname.includes('email/verify')
        ) {
            navigate('/home/account');
            return;
        }

        if (authCallback.includes(location.pathname)) {
            if (auth.intended) {
                handleRedirect({ intended: auth.intended });
            } else if (auth.redirect) {
                handleRedirect({ redirect: auth.redirect });
            }
            return;
        }

        if (
            !(
                location.pathname === '/' ||
                authCheck.includes(location.pathname) ||
                location.pathname.includes('password/reset')
            )
        ) {
            return;
        }

        if (auth.intended) {
            handleRedirect({ intended: auth.intended });
            return;
        }

        if (auth.redirect) {
            handleRedirect({ redirect: auth.redirect });
            return;
        }
    }, [auth.status, location]);

    return { matchRoute };
};

export default useAuthRouteHandler;
