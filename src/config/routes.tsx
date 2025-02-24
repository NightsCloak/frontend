import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import Main from '@/layout/Main';
import ErrorScreen from '@/screens/error/ErrorScreen';
import LoginScreen from '@/layout/screens/LoginScreen';
import App from '@/App';
import Root from '@/screens/Root';
import ChroniclesDashboard from '@/screens/chronicles/ChroniclesDashboard';

/* eslint-disable react-refresh/only-export-components */

const AuthCallback = lazy(() => import('@/screens/auth/AuthCallbackScreen'));
const ForgotPasswordScreen = lazy(() => import('@/screens/auth/ForgotPasswordScreen'));
const MaintenanceScreen = lazy(() => import('@/screens/error/MaintenanceScreen'));
const ResendVerifyEmailScreen = lazy(() => import('@/screens/auth/ResendVerifyEmailScreen'));
const ResetPasswordScreen = lazy(() => import('@/screens/auth/ResetPasswordScreen'));
const VerifiesEmailScreen = lazy(() => import('@/screens/auth/VerifiesEmailScreen'));

const UserDashboard = lazy(() => import('@/screens/users/Dashboard'));
const routes: RouteObject[] = [
    {
        element: <App />,
        children: [
            //Non-Auth Routes - Hide sidebar so user can't try to leave settings if not verified/authorized
            {
                path: '/',
                element: <Main />,
                children: [
                    {
                        path: '*',
                        element: (
                            <ErrorScreen
                                {...{
                                    screenNotFound: true,
                                    title: '404',
                                    message: 'Unable to locate the page you requested.',
                                }}
                            />
                        ),
                    },
                    { path: '/', element: <Root /> },
                    { path: '/maintenance', element: <MaintenanceScreen /> },
                    { path: '/login', element: <LoginScreen /> },
                    { path: 'auth/callback', element: <AuthCallback /> },
                    { path: 'password/forgot', element: <ForgotPasswordScreen /> },
                    { path: 'password/reset/:token', element: <ResetPasswordScreen /> },
                    { path: 'email/verify/:userId/:emailHash', element: <VerifiesEmailScreen /> },
                    { path: 'email/verify/resend', element: <ResendVerifyEmailScreen /> },
                ],
            },
            {
                path: '/users',
                element: <Main />,
                children: [
                    {
                        path: '/users',
                        element: <UserDashboard />,
                    },
                ],
            },
            {
                path: '/chronicles',
                element: <Main />,
                children: [
                    {
                        path: '/chronicles',
                        element: <ChroniclesDashboard />,
                    },
                ],
            },
        ],
    },
];

export default routes;
