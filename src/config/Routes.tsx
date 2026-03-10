import { FC, lazy } from 'react';
import { RouterProvider } from 'react-router';
import { createBrowserRouter, RouteObject } from 'react-router-dom';

const App = lazy(() => import('@/App'));
const Main = lazy(() => import('@/layout/Main'));
const Root = lazy(() => import('@/screens/Root'));
const AuthCallback = lazy(() => import('@/screens/auth/AuthCallbackScreen'));
const ForgotPasswordScreen = lazy(() => import('@/screens/auth/ForgotPasswordScreen'));
const MaintenanceScreen = lazy(() => import('@/screens/error/MaintenanceScreen'));
const ErrorScreen = lazy(() => import('@/screens/error/ErrorScreen'));
const LoginScreen = lazy(() => import('@/screens/auth/LoginScreen'));
const RegisterScreen = lazy(() => import('@/screens/auth/RegisterScreen'));
const ThirdPartyOauthCallbackScreen = lazy(() => import('@/screens/auth/ThirdPartyOauthCallbackScreen'));
const ResendVerifyEmailScreen = lazy(() => import('@/screens/auth/ResendVerifyEmailScreen'));
const ResetPasswordScreen = lazy(() => import('@/screens/auth/ResetPasswordScreen'));
const VerifiesEmailScreen = lazy(() => import('@/screens/auth/VerifiesEmailScreen'));

const UserDashboard = lazy(() => import('@/screens/users/Dashboard'));
const UserAccountScreen = lazy(() => import('@/screens/users/AccountScreen'));
const UserChroniclesDashboard = lazy(() => import('@/screens/chronicles/UserChroniclesDashboard'));
const UserChronicle = lazy(() => import('@/screens/chronicles/UserChronicle'));

const Chronicles = lazy(() => import('@/screens/chronicles/Chronicles'));
const Chronicle = lazy(() => import('@/screens/chronicles/Chronicle'));

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
                    { path: 'login', element: <LoginScreen /> },
                    { path: 'register', element: <RegisterScreen /> },
                    { path: 'auth/callback', element: <AuthCallback /> },
                    { path: 'login/social/:provider/callback', element: <ThirdPartyOauthCallbackScreen /> },
                    { path: 'password/forgot', element: <ForgotPasswordScreen /> },
                    { path: 'password/reset/:token', element: <ResetPasswordScreen /> },
                    { path: 'email/verify/:userId/:emailHash', element: <VerifiesEmailScreen /> },
                    { path: 'email/verify/resend', element: <ResendVerifyEmailScreen /> },
                ],
            },
            {
                path: '/home',
                element: <Main />,
                children: [
                    {
                        path: 'home',
                        element: <UserDashboard />,
                    },
                    {
                        path: 'account',
                        element: <UserAccountScreen />,
                    },
                ],
            },
            {
                path: '/user',
                element: <Main />,
                children: [
                    {
                        path: 'chronicles',
                        element: <UserChroniclesDashboard />,
                    },
                    {
                        path: 'chronicles/:chronicleId',
                        element: <UserChronicle />,
                    },
                ],
            },
            {
                path: '/chronicles',
                element: <Main />,
                children: [
                    {
                        path: '/chronicles',
                        element: <Chronicles />,
                    },
                    {
                        path: ':chronicleId',
                        element: <Chronicle />,
                    },
                ],
            },
        ],
    },
];

const browserRouter = createBrowserRouter(routes);

const Router: FC = () => {
    return (
        <>
            <RouterProvider router={browserRouter} />
        </>
    );
};

export default Router;
