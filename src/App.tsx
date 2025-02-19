import { Suspense, useCallback, useEffect, useMemo } from 'react';
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
import RootProvider from '@/providers/RootProvider';
import theme from '@/config/theme';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import defaultTheme from '@/config/theme';
import { toggleDarkMode } from '@/redux/reducers/userSlice';
import { createTheme } from '@mui/material';
import { useHeartbeatQuery } from '@/redux/features/auth';

function App() {
    //Init Redux
    useHeartbeatQuery(undefined, { pollingInterval: 300000 });
    const dispatch = useAppDispatch();
    const maintenance = useAppSelector((state) => state.app.maintenance);
    usePageTracking();
    useTabSync();
    const [searchParams] = useSearchParams();
    const { matchRoute } = AuthRouteHandler(searchParams);
    const auth = useAppSelector((state) => state.auth);
    const user = useAppSelector((state) => state.user);
    const navigate = useNavigate();

    //Get OS Dark/Lite mode as initial default
    const osDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const prefersDarkMode = useMemo(() => {
        return user.settings.darkMode ?? osDarkMode;
    }, [osDarkMode, user.settings.darkMode]);

    const generatedTheme = useMemo(() => {
        const darkMode = user.settings.darkMode ?? prefersDarkMode;

        //Storybook handles theme switching
        // if (theme) {
        //     return createTheme(theme);
        // }

        return createTheme(defaultTheme(darkMode));
    }, [prefersDarkMode, user.settings.darkMode, theme]);

    useEffect(() => {
        dispatch(toggleDarkMode(prefersDarkMode));
    }, [prefersDarkMode]);

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
    }, [user]);

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
            <RootProvider theme={generatedTheme}>
                <CssBaseline />
                <ErrorBoundary FallbackComponent={AppError}>
                    <Suspense fallback={null}>
                        <Outlet />
                    </Suspense>
                </ErrorBoundary>
            </RootProvider>
        </div>
    );
}

export default App;
