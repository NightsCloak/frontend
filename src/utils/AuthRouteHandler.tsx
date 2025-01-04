import { useLocation, useMatch, useNavigate } from 'react-router-dom';
import { useEffect, useMemo } from 'react';

import { useAppSelector } from '@intractinc/base/redux/hooks';

const AuthRouteHandler = (searchParams: URLSearchParams) => {
    const auth = useAppSelector((state) => state.auth);
    const user = useAppSelector((state) => state.user);

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
        'invite',
        'shared',
    ];

    const navigate = useNavigate();
    const location = useLocation();

    const matchRoute = useMatch('maintenance');

    const isGuestPath = useMemo(() => {
        return guestRoutes.some((route) => location.pathname.includes(route) || location.pathname === '/');
    }, [location]);

    //Handles
    useEffect(() => {
        const intended = searchParams.get('intended');

        if (auth.status) {
            if (
                user.settings.verified !== null &&
                !user.settings.verified &&
                location.pathname !== '/account' &&
                !location.pathname.includes('email/verify')
            ) {
                navigate('/account');
                return;
            }

            const authCheck = [
                '/login',
                '/register',
                '/email/verify/resend',
                '/password/forgot',
                '/auth/callback',
                '/login/social/google/callback',
            ];
            if (authCheck.includes(location.pathname) || location.pathname.includes('password/reset')) {
                //We are authenticated and on login screen
                if (intended) {
                    window.location.href = intended;
                    return;
                } else {
                    navigate('/');
                }
            }
            //Passed All
            return;
        }

        if (!isGuestPath) {
            navigate('/login');
        }
    }, [auth.status, location, user]);

    return { matchRoute };
};

export default AuthRouteHandler;
