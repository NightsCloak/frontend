import { Suspense, useCallback, useEffect } from 'react';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import usePageTracking from '@/hooks/usePageTracking';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { clearXSRF } from '@/redux/reducers/authSlice';
import 'react-activity/dist/Levels.css';
import 'react-activity/dist/Dots.css';
import 'react-activity/dist/Digital.css';
import 'react-activity/dist/Sentry.css';
import 'react-activity/dist/Windmill.css';
import 'react-activity/dist/Spinner.css';
import AppError from '@/errors/AppError';
import { ErrorBoundary } from 'react-error-boundary';
import AuthRouteHandler from '@/utils/AuthRouteHandler';
import * as Sentry from '@sentry/react';
import { useGetUserQuery } from '@/redux/features/user';
import useTabSync from '@/hooks/useTabSync';
import BaseProvider from '@/BaseProvider';
import theme from '@/config/theme';
import { CssBaseline } from '@mui/material';

function App() {
    const dispatch = useAppDispatch();
    const maintenance = useAppSelector((state) => state.app.maintenance);
    usePageTracking();
    useTabSync();
    const [searchParams] = useSearchParams();
    const { matchRoute } = AuthRouteHandler(searchParams);
    const auth = useAppSelector((state) => state.auth);
    const user = useAppSelector((state) => state.user);
    const guest = useAppSelector((state) => state.guest);
    const navigate = useNavigate();

    useEffect(() => {
        return () => {
            //Clear XSRF So it's not set for next session
            dispatch(clearXSRF());
        };
    }, []);

    const { refetch, isUninitialized } = useGetUserQuery(undefined, {
        skip: (!auth.pkce.accessToken || !auth.xsrfToken) && !auth.status,
        refetchOnMountOrArgChange: true,
    });

    const handleMaintenanceSet = useCallback(() => {
        !matchRoute && navigate('/maintenance');
    }, [navigate]);

    useEffect(() => {
        maintenance && handleMaintenanceSet();
        !maintenance && matchRoute && !isUninitialized && refetch();
    }, [handleMaintenanceSet, maintenance]);

    useEffect(() => {
        if (user.data) {
            Sentry.setUser({
                id: user.data.id,
                name: user.data.name,
                email: user.data.email,
            });
        }
        if (guest.id && guest.name) {
            Sentry.setUser({
                id: guest.id,
                name: guest.name,
            });
        }
    }, [user, guest]);

    return (
        <div
            id={'app'}
            data-testid={'appRoot'}
            style={{
                flex: 1,
                display: 'flex',
                height: '100%',
                width: '100%',
                flexDirection: 'column',
                justifyContent: 'center',
                alignContent: 'center',
            }}
        >
            <BaseProvider configTheme={theme}>
                <CssBaseline />
                <ErrorBoundary FallbackComponent={AppError}>
                    <Suspense fallback={null}>
                        <Outlet />
                    </Suspense>
                </ErrorBoundary>
            </BaseProvider>
        </div>
    );
}

export default App;
