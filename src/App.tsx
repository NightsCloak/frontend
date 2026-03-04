import { Suspense, useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import defaultTheme from '@/config/theme';
import { Outlet, useNavigate } from 'react-router-dom';
import usePageTracking from '@/hooks/usePageTracking';
import useTabSync from '@/hooks/useTabSync';
import EchoProvider from '@/providers/EchoProvider';
import 'react-activity/dist/Dots.css';
import 'react-activity/dist/Levels.css';
import 'react-activity/dist/Sentry.css';
import 'react-activity/dist/Spinner.css';
import 'react-activity/dist/Digital.css';
import 'react-activity/dist/Bounce.css';
import 'react-activity/dist/Windmill.css';
import { toggleDarkMode } from '@/redux/reducers/userSlice';
import AppError from '@/errors/AppError';
import { ErrorBoundary } from 'react-error-boundary';
import ToolsProvider from '@/providers/ToolsProvider';
import { clearXSRF } from '@/redux/reducers/authSlice';
import { useHeartbeatQuery } from '@/redux/features/authApi';
import * as Sentry from '@sentry/react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useMediaQuery } from '@mui/material';
import useAuthRouteHandler from '@/utils/useAuthRouteHandler';
import { useGetUserQuery } from '@/redux/features/user';
import { skipToken } from '@reduxjs/toolkit/query/react';

function App() {
    useHeartbeatQuery(undefined, { pollingInterval: 3 * 60 * 1000 });
    const dispatch = useAppDispatch();
    const maintenance = useAppSelector((state) => state.app.maintenance);
    const { matchRoute } = useAuthRouteHandler();
    usePageTracking();
    useTabSync();

    const user = useAppSelector((state) => state.user);
    const auth = useAppSelector((state) => state.auth);

    const navigate = useNavigate();

    const osDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const prefersDarkMode = user.settings.darkMode ?? osDarkMode;



    const { refetch, isUninitialized } = useGetUserQuery(!auth.status ? skipToken : null, {
        refetchOnMountOrArgChange: true,
    });


    const handleMaintenanceSet = useCallback(() => {
        !matchRoute && navigate('/maintenance');
    }, [matchRoute, navigate]);

    const configTheme = useCallback(() => {
        return defaultTheme(user.settings.darkMode ?? prefersDarkMode);
    }, [prefersDarkMode, user.settings.darkMode]);

    useEffect(() => {
        return () => {
            //Clear XSRF So it's not set for next session
            dispatch(clearXSRF());
        };
    }, []);

    useEffect(() => {
        dispatch(toggleDarkMode(prefersDarkMode));
    }, [prefersDarkMode]);

    useEffect(() => {
        maintenance && handleMaintenanceSet();
        !maintenance && matchRoute && !isUninitialized && refetch();
    }, [handleMaintenanceSet, maintenance, matchRoute]);

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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <ToolsProvider>
                    <EchoProvider>
                        <ThemeProvider theme={configTheme()}>
                            <ErrorBoundary fallback={<AppError />}>
                                <CssBaseline />
                                <Suspense fallback={null}>
                                    <Outlet />
                                </Suspense>
                            </ErrorBoundary>
                        </ThemeProvider>
                    </EchoProvider>
                </ToolsProvider>
            </LocalizationProvider>
        </div>
    );
}

export default App;
