import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import Main from '@/screens/layouts/Main';
import ErrorScreen from '@/screens/error/ErrorScreen';
import LoginScreen from '@intractinc/base/layout/screens/LoginScreen';
import App from '@/App';
import RootIndex from '@/screens/RootIndex';

/* eslint-disable react-refresh/only-export-components */
const AdminAllAiImagesScreen = lazy(() => import('@/screens/admin/AllAiImagesScreen'));
const AdminAllCollectionsScreen = lazy(() => import('@/screens/admin/AllCollectionsScreen'));
const AdminAllMediaScreen = lazy(() => import('@/screens/admin/AllMediaScreen'));
const AdminAllModelsScreen = lazy(() => import('@/screens/admin/AllModelsScreen'));
const AdminAllReviewsScreen = lazy(() => import('@/screens/admin/AllReviewsScreen'));
const AdminAllRobloxAvatarDecksScreen = lazy(() => import('@/screens/admin/AllRobloxAvatarDecksScreen'));
const AdminAllUserCollectionsScreen = lazy(() => import('@/screens/admin/AllUserCollectionsScreen'));
const AdminAllUserImagesScreen = lazy(() => import('@/screens/admin/AllUserImagesScreen'));
const AdminAllUserModelsScreen = lazy(() => import('@/screens/admin/AllUserModelsScreen'));
const AdminAuditsScreen = lazy(() => import('@/screens/admin/AuditsScreen'));
const AdminDashboardScreen = lazy(() => import('@/screens/admin/DashboardScreen'));
const AdminHDRIsScreen = lazy(() => import('@/screens/admin/HDRIsScreen'));
const AdminImagesScreen = lazy(() => import('@/screens/admin/ImagesScreen'));

const AdminOrganizationScreen = lazy(() => import('@/screens/admin/OrganizationScreen'));
const AdminOrganizationsScreen = lazy(() => import('@/screens/admin/OrganizationsScreen'));
const AdminIntractModelsScreen = lazy(() => import('@/screens/admin/IntractModelsScreen'));
const AdminIntractModelUploadScreen = lazy(() => import('@/screens/admin/IntractModelUploadScreen'));
const AdminIntractPluginsScreen = lazy(() => import('@/screens/admin/PluginsScreen'));
const AdminProjectCollectionScreen = lazy(() => import('@/screens/admin/ProjectCollectionScreen'));
const AdminProjectCollectionsScreen = lazy(() => import('@/screens/admin/ProjectCollectionsScreen'));
const AdminProjectMediaScreen = lazy(() => import('@/screens/admin/ProjectMediaScreen'));
const AdminProjectModelsScreen = lazy(() => import('@/screens/admin/ProjectModelsScreen'));
const AdminProjectReviewScreen = lazy(() => import('@/screens/admin/ProjectReviewScreen'));
const AdminProjectReviewsScreen = lazy(() => import('@/screens/admin/ProjectReviewsScreen'));
const AdminProjectScreen = lazy(() => import('@/screens/admin/ProjectScreen'));
const AdminProjectsScreen = lazy(() => import('@/screens/admin/ProjectsScreen'));

const AdminTagsScreen = lazy(() => import('@/screens/admin/TagsScreen'));
const AdminUserAiImagesScreen = lazy(() => import('@/screens/admin/UserAiImagesScreen'));
const AdminUserCollectionScreen = lazy(() => import('@/screens/admin/UserCollectionScreen'));
const AdminUserCollectionsScreen = lazy(() => import('@/screens/admin/UserCollectionsScreen'));
const AdminUserImagesScreen = lazy(() => import('@/screens/admin/UserImagesScreen'));
const AdminUserModelsScreen = lazy(() => import('@/screens/admin/UserModelsScreen'));
const AdminUserScreen = lazy(() => import('@/screens/admin/UserScreen'));
const AdminUsersScreen = lazy(() => import('@/screens/admin/UsersScreen'));
const AuthCallback = lazy(() => import('@/screens/auth/AuthCallbackScreen'));
const ForgotPasswordScreen = lazy(() => import('@/screens/auth/ForgotPasswordScreen'));
const MaintenanceScreen = lazy(() => import('@/screens/error/MaintenanceScreen'));
const ResendVerifyEmailScreen = lazy(() => import('@/screens/auth/ResendVerifyEmailScreen'));
const ResetPasswordScreen = lazy(() => import('@/screens/auth/ResetPasswordScreen'));
const VerifiesEmailScreen = lazy(() => import('@/screens/auth/VerifiesEmailScreen'));

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
                    { path: '/', element: <RootIndex /> },
                    { path: '/maintenance', element: <MaintenanceScreen /> },
                    { path: '/login', element: <LoginScreen /> },
                    { path: 'auth/callback', element: <AuthCallback /> },
                    { path: 'password/forgot', element: <ForgotPasswordScreen /> },
                    { path: 'password/reset/:token', element: <ResetPasswordScreen /> },
                    { path: 'email/verify/:userId/:emailHash', element: <VerifiesEmailScreen /> },
                    { path: 'email/verify/resend', element: <ResendVerifyEmailScreen /> },
                ],
            },
            //Admin Routes
            {
                path: 'admin',
                element: <Main />,
                children: [
                    { path: '/admin', element: <AdminDashboardScreen /> },
                    { path: '/admin/users', element: <AdminUsersScreen /> },
                    { path: '/admin/organizations', element: <AdminOrganizationsScreen /> },
                    { path: '/admin/organizations/:orgId', element: <AdminOrganizationScreen /> },
                    { path: '/admin/projects', element: <AdminProjectsScreen /> },
                    { path: '/admin/projects/:projectId', element: <AdminProjectScreen /> },
                    { path: '/admin/projects/:projectId/models', element: <AdminProjectModelsScreen /> },
                    { path: '/admin/projects/:projectId/media', element: <AdminProjectMediaScreen /> },
                    { path: '/admin/projects/:projectId/folders', element: <AdminProjectCollectionsScreen /> },
                    {
                        path: '/admin/projects/:projectId/folders/:collectionId',
                        element: <AdminProjectCollectionScreen />,
                    },
                    { path: '/admin/projects/:projectId/reviews', element: <AdminProjectReviewsScreen /> },
                    {
                        path: '/admin/projects/:projectId/reviews/:reviewId',
                        element: <AdminProjectReviewScreen />,
                    },
                    { path: '/admin/media', element: <AdminAllMediaScreen /> },
                    { path: '/admin/models', element: <AdminAllModelsScreen /> },
                    { path: '/admin/folders', element: <AdminAllCollectionsScreen /> },
                    { path: '/admin/reviews', element: <AdminAllReviewsScreen /> },
                    { path: '/admin/user-models', element: <AdminAllUserModelsScreen /> },
                    { path: '/admin/user-folders', element: <AdminAllUserCollectionsScreen /> },
                    { path: '/admin/user-images', element: <AdminAllUserImagesScreen /> },
                    { path: '/admin/ai-images', element: <AdminAllAiImagesScreen /> },
                    { path: '/admin/images', element: <AdminImagesScreen /> },
                    { path: '/admin/intract-models', element: <AdminIntractModelsScreen /> },
                    { path: '/admin/intract-models/:assetId/ingest', element: <AdminIntractModelUploadScreen /> },
                    { path: '/admin/intract-plugins', element: <AdminIntractPluginsScreen /> },
                    { path: '/admin/roblox-avatar-decks', element: <AdminAllRobloxAvatarDecksScreen /> },
                    { path: '/admin/tags', element: <AdminTagsScreen /> },
                    { path: '/admin/hdris', element: <AdminHDRIsScreen /> },
                    { path: '/admin/audits', element: <AdminAuditsScreen /> },
                    {
                        path: '/admin/users/:userId',
                        element: <AdminUserScreen />,
                    },
                    {
                        path: '/admin/users/:userId/models',
                        element: <AdminUserModelsScreen />,
                    },
                    {
                        path: '/admin/users/:userId/images',
                        element: <AdminUserImagesScreen />,
                    },
                    {
                        path: '/admin/users/:userId/ai-images',
                        element: <AdminUserAiImagesScreen />,
                    },
                    {
                        path: '/admin/users/:userId/folders',
                        element: <AdminUserCollectionsScreen />,
                    },
                    {
                        path: '/admin/users/:userId/folders/:collectionId',
                        element: <AdminUserCollectionScreen />,
                    },
                ],
            },
        ],
    },
];

export default routes;
