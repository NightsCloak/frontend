import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import Landing from '@/screens/layouts/Landing';
import Main from '@/screens/layouts/Main';
import ErrorScreen from '@/screens/error/ErrorScreen';
import Engine from '@/screens/layouts/Engine';
import Admin from '@/screens/layouts/Admin';
import LoginScreen from '@intractinc/base/layout/screens/LoginScreen';
import RegisterScreen from '@intractinc/base/layout/screens/RegisterScreen';
import TermsScreen from '@intractinc/base/layout/screens/TermsScreen';
import App from '@/App';

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
const AdminModelScreen = lazy(() => import('@/screens/admin/ModelScreen'));
const AdminOrganizationScreen = lazy(() => import('@/screens/admin/OrganizationScreen'));
const AdminOrganizationsScreen = lazy(() => import('@/screens/admin/OrganizationsScreen'));
const AdminIntractModelsScreen = lazy(() => import('@/screens/admin/IntractModelsScreen'));
const AdminIntractModelScreen = lazy(() => import('@/screens/admin/IntractModelScreen'));
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
const AdminRobloxAvatarDeckScreen = lazy(() => import('@/screens/admin/RobloxAvatarDeckScreen'));
const AdminTagsScreen = lazy(() => import('@/screens/admin/TagsScreen'));
const AdminUserAiImagesScreen = lazy(() => import('@/screens/admin/UserAiImagesScreen'));
const AdminUserCollectionScreen = lazy(() => import('@/screens/admin/UserCollectionScreen'));
const AdminUserCollectionsScreen = lazy(() => import('@/screens/admin/UserCollectionsScreen'));
const AdminUserImagesScreen = lazy(() => import('@/screens/admin/UserImagesScreen'));
const AdminUserModelsScreen = lazy(() => import('@/screens/admin/UserModelsScreen'));
const AdminUserScreen = lazy(() => import('@/screens/admin/UserScreen'));
const AdminUsersScreen = lazy(() => import('@/screens/admin/UsersScreen'));
const AuthCallback = lazy(() => import('@/screens/auth/AuthCallbackScreen'));
const CommunityAssetScreen = lazy(() => import('@/screens/community/ModelScreen'));
const CommunityDashboardScreen = lazy(() => import('@/screens/community/DashboardScreen'));
const CommunityImagesScreen = lazy(() => import('@/screens/community/ImagesScreen'));
const CommunityModelCollectionScreen = lazy(() => import('@/screens/community/ModelCollectionScreen'));
const CommunityModelCollectionsScreen = lazy(() => import('@/screens/community/ModelCollectionsScreen'));
const CommunityProjectScreen = lazy(() => import('@/screens/community/ProjectScreen'));
const CommunityProjectsScreen = lazy(() => import('@/screens/community/ProjectsScreen'));
const ContactScreen = lazy(() => import('@/screens/ContactScreen'));
const ForgotPasswordScreen = lazy(() => import('@/screens/auth/ForgotPasswordScreen'));
const GoogleLoginCallbackScreen = lazy(() => import('@/screens/auth/GoogleLoginCallbackScreen'));
const InvitedScreen = lazy(() => import('@/screens/InvitedScreen'));

const MaintenanceScreen = lazy(() => import('@/screens/error/MaintenanceScreen'));
const OrganizationBillingScreen = lazy(() => import('@/screens/organizations/BillingScreen'));
const OrganizationDashboardScreen = lazy(() => import('@/screens/organizations/DashboardScreen'));
const OrganizationMembersScreen = lazy(() => import('@/screens/organizations/MembersScreen'));
const OrganizationNotificationsScreen = lazy(() => import('@/screens/organizations/NotificationsScreen'));
const OrganizationsScreen = lazy(() => import('@/screens/organizations/OrganizationsScreen'));
const PendingOrganizationsScreen = lazy(() => import('@/screens/organizations/PendingOrganizationsScreen'));
const PrivacyScreen = lazy(() => import('@/screens/PrivacyScreen'));
const ProjectDashboardScreen = lazy(() => import('@/screens/projects/DashboardScreen'));
const ProjectFallbackScreen = lazy(() => import('@/screens/projects/FallbackScreen'));
const ProjectMediaScreen = lazy(() => import('@/screens/projects/MediaScreen'));
const ProjectMembersScreen = lazy(() => import('@/screens/projects/MembersScreen'));
const ProjectModelCollectionScreen = lazy(() => import('@/screens/projects/ModelCollectionScreen'));
const ProjectModelCollectionsScreen = lazy(() => import('@/screens/projects/ModelCollectionsScreen'));
const ProjectModelScreen = lazy(() => import('@/screens/projects/ModelScreen'));
const ProjectModelUploadScreen = lazy(() => import('@/screens/projects/ModelUploadScreen'));
const ProjectModelsScreen = lazy(() => import('@/screens/projects/ModelsScreen'));
const ProjectReviewScreen = lazy(() => import('@/screens/projects/ReviewScreen'));
const ProjectReviewsScreen = lazy(() => import('@/screens/projects/ReviewsScreen'));
const ProjectRobloxAvatarDeckScreen = lazy(() => import('@/screens/projects/RobloxAvatarDeckScreen'));
const ProjectRobloxAvatarDecksScreen = lazy(() => import('@/screens/projects/RobloxAvatarDecksScreen'));
const ProjectTrashScreen = lazy(() => import('@/screens/projects/TrashScreen'));
const ProjectTrashedMediaScreen = lazy(() => import('@/screens/projects/TrashedMediaScreen'));
const ProjectTrashedModelCollectionsScreen = lazy(() => import('@/screens/projects/TrashedModelCollectionsScreen'));
const ProjectTrashedModelsScreen = lazy(() => import('@/screens/projects/TrashedModelsScreen'));
const ProjectTrashedReviewsScreen = lazy(() => import('@/screens/projects/TrashedReviewsScreen'));

const ResendVerifyEmailScreen = lazy(() => import('@/screens/auth/ResendVerifyEmailScreen'));
const ResetPasswordScreen = lazy(() => import('@/screens/auth/ResetPasswordScreen'));
const SharedModelPresentationScreen = lazy(() => import('@/screens/shared/SharedModelPresentationScreen'));
const SharedModelScreen = lazy(() => import('@/screens/shared/SharedModelScreen'));
const SharedOrganizationScreen = lazy(() => import('@/screens/shared/SharedOrganizationScreen'));
const SharedProjectScreen = lazy(() => import('@/screens/shared/SharedProjectScreen'));

const UserAccountScreen = lazy(() => import('@/screens/users/AccountScreen'));
const UserAiImagesScreen = lazy(() => import('@/screens/users/AiImagesScreen'));
const UserDashboardScreen = lazy(() => import('@/screens/users/DashboardScreen'));
const UserImagesScreen = lazy(() => import('@/screens/users/ImagesScreen'));
const UserModelCollectionScreen = lazy(() => import('@/screens/users/ModelCollectionScreen'));
const UserModelCollectionsScreen = lazy(() => import('@/screens/users/ModelCollectionsScreen'));
const UserModelScreen = lazy(() => import('@/screens/users/ModelScreen'));
const UserModelUploadScreen = lazy(() => import('@/screens/users/ModelUploadScreen'));
const UserModelsScreen = lazy(() => import('@/screens/users/ModelsScreen'));
const UserNotificationsScreen = lazy(() => import('@/screens/users/NotificationsScreen'));
const UserSharedModelsScreen = lazy(() => import('@/screens/users/SharedModelsScreen'));
const UserTutorialsScreen = lazy(() => import('@/screens/users/TutorialsScreen'));
const VerifiesEmailScreen = lazy(() => import('@/screens/auth/VerifiesEmailScreen'));

const routes: RouteObject[] = [
    {
        element: <App />,
        children: [
            //Main Routes
            {
                path: '/',
                children: [{ path: '/', element: <Landing /> }],
            },
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
                    { path: 'maintenance', element: <MaintenanceScreen /> },
                    { path: 'contact', element: <ContactScreen /> },
                    { path: 'login', element: <LoginScreen /> },
                    { path: 'auth/callback', element: <AuthCallback /> },
                    { path: 'login/social/google/callback', element: <GoogleLoginCallbackScreen /> },
                    { path: 'register', element: <RegisterScreen /> },
                    { path: 'password/forgot', element: <ForgotPasswordScreen /> },
                    { path: 'password/reset/:token', element: <ResetPasswordScreen /> },
                    { path: 'email/verify/:userId/:emailHash', element: <VerifiesEmailScreen /> },
                    { path: 'email/verify/resend', element: <ResendVerifyEmailScreen /> },
                    { path: 'terms', element: <TermsScreen /> },
                    { path: 'privacy', element: <PrivacyScreen /> },
                    { path: 'invite/:oldCode', element: <RegisterScreen /> },
                    { path: 'invited/member/:code', element: <InvitedScreen /> },
                    { path: 'shared/organizations/:code', element: <SharedOrganizationScreen /> },
                    { path: 'shared/projects/:code', element: <SharedProjectScreen /> },
                ],
            },
            //Engine Routes
            {
                path: '/',
                element: <Engine />,
                children: [
                    {
                        path: '/home/models/:assetId/editor',
                        element: <UserModelScreen />,
                    },
                    {
                        path: '/home/shared/models/:assetId/editor',
                        element: <UserModelScreen />,
                    },
                    {
                        path: '/projects/:projectId/models/:assetId/editor',
                        element: <ProjectFallbackScreen />,
                    },
                    {
                        path: '/organizations/:workspaceId/projects/:workspaceProjectId/models/:assetId/editor',
                        element: <ProjectModelScreen />,
                    },
                    {
                        path: '/organizations/:workspaceId/projects/:workspaceProjectId/roblox-avatars/:deckId',
                        element: <ProjectRobloxAvatarDeckScreen />,
                    },
                    {
                        path: '/community/folders/:collectionId/models/:assetId/viewer',
                        element: <CommunityAssetScreen />,
                    },
                    {
                        path: '/community/projects/:projectId/models/:assetId/viewer',
                        element: <CommunityAssetScreen />,
                    },
                    {
                        path: '/admin/intract-models/:assetId/editor',
                        element: <AdminIntractModelScreen />,
                    },
                    {
                        path: '/admin/assets/:assetType/:assetId/viewer',
                        element: <AdminModelScreen />,
                    },
                    {
                        path: '/admin/roblox-avatar-decks/:deckId',
                        element: <AdminRobloxAvatarDeckScreen />,
                    },
                    { path: 'shared/assets/:code', element: <SharedModelScreen {...{ resource: 'assets' }} /> },
                    { path: 'shared/presentations/:code', element: <SharedModelPresentationScreen /> },
                    {
                        path: 'shared/userAssets/:code',
                        element: <SharedModelScreen {...{ resource: 'userAssets' }} />,
                    },
                ],
            },
            {
                path: '/home',
                element: <Main />,
                children: [
                    {
                        path: '/home',
                        element: <UserDashboardScreen />,
                    },
                    {
                        path: '/home/account',
                        element: <UserAccountScreen />,
                    },
                    {
                        path: '/home/models',
                        element: <UserModelsScreen />,
                    },
                    {
                        path: '/home/shared/models',
                        element: <UserSharedModelsScreen />,
                    },
                    {
                        path: '/home/folders',
                        element: <UserModelCollectionsScreen />,
                    },
                    {
                        path: '/home/images',
                        element: <UserImagesScreen />,
                    },
                    {
                        path: '/home/ai-images',
                        element: <UserAiImagesScreen />,
                    },
                    {
                        path: '/home/folders/:collectionId',
                        element: <UserModelCollectionScreen />,
                    },
                    {
                        path: '/home/models/:assetId/ingest',
                        element: <UserModelUploadScreen />,
                    },
                    {
                        path: '/home/tutorials',
                        element: <UserTutorialsScreen />,
                    },
                    {
                        path: '/home/notifications',
                        element: <UserNotificationsScreen />,
                    },
                    {
                        path: '/home/organizations',
                        element: <OrganizationsScreen />,
                    },
                    {
                        path: '/home/pending-organizations',
                        element: <PendingOrganizationsScreen />,
                    },
                ],
            },
            {
                path: 'community',
                element: <Main />,
                children: [
                    {
                        path: '/community',
                        element: <CommunityDashboardScreen />,
                    },
                    {
                        path: '/community/folders',
                        element: <CommunityModelCollectionsScreen />,
                    },
                    {
                        path: '/community/projects',
                        element: <CommunityProjectsScreen />,
                    },
                    {
                        path: '/community/images',
                        element: <CommunityImagesScreen />,
                    },
                    {
                        path: '/community/projects/:projectId',
                        element: <CommunityProjectScreen />,
                    },
                    {
                        path: '/community/folders/:collectionId',
                        element: <CommunityModelCollectionScreen />,
                    },
                ],
            },
            {
                path: 'organizations',
                element: <Main />,
                children: [
                    {
                        path: '/organizations',
                        element: (
                            <ErrorScreen
                                {...{
                                    title: '404',
                                    message: 'Unable to locate the page you requested.',
                                }}
                            />
                        ),
                    },
                    {
                        path: '/organizations/:workspaceId',
                        element: <OrganizationDashboardScreen />,
                    },
                    {
                        path: '/organizations/:workspaceId/members',
                        element: <OrganizationMembersScreen />,
                    },
                    {
                        path: '/organizations/:workspaceId/notifications',
                        element: <OrganizationNotificationsScreen />,
                    },
                    {
                        path: '/organizations/:workspaceId/billing',
                        element: <OrganizationBillingScreen />,
                    },
                    {
                        path: '/organizations/:workspaceId/projects/:workspaceProjectId',
                        element: <ProjectDashboardScreen />,
                    },
                    {
                        path: '/organizations/:workspaceId/projects/:workspaceProjectId/members',
                        element: <ProjectMembersScreen />,
                    },
                    {
                        path: '/organizations/:workspaceId/projects/:workspaceProjectId/media',
                        element: <ProjectMediaScreen />,
                    },
                    {
                        path: '/organizations/:workspaceId/projects/:workspaceProjectId/trash',
                        element: <ProjectTrashScreen />,
                    },
                    {
                        path: '/organizations/:workspaceId/projects/:workspaceProjectId/trash/models',
                        element: <ProjectTrashedModelsScreen />,
                    },
                    {
                        path: '/organizations/:workspaceId/projects/:workspaceProjectId/trash/folders',
                        element: <ProjectTrashedModelCollectionsScreen />,
                    },
                    {
                        path: '/organizations/:workspaceId/projects/:workspaceProjectId/trash/reviews',
                        element: <ProjectTrashedReviewsScreen />,
                    },
                    {
                        path: '/organizations/:workspaceId/projects/:workspaceProjectId/trash/media',
                        element: <ProjectTrashedMediaScreen />,
                    },
                    {
                        path: '/organizations/:workspaceId/projects/:workspaceProjectId/models',
                        element: <ProjectModelsScreen />,
                    },
                    {
                        path: '/organizations/:workspaceId/projects/:workspaceProjectId/models/:assetId/ingest',
                        element: <ProjectModelUploadScreen />,
                    },
                    {
                        path: '/organizations/:workspaceId/projects/:workspaceProjectId/folders',
                        element: <ProjectModelCollectionsScreen />,
                    },
                    {
                        path: '/organizations/:workspaceId/projects/:workspaceProjectId/folders/:collectionId',
                        element: <ProjectModelCollectionScreen />,
                    },
                    {
                        path: '/organizations/:workspaceId/projects/:workspaceProjectId/reviews',
                        element: <ProjectReviewsScreen />,
                    },
                    {
                        path: '/organizations/:workspaceId/projects/:workspaceProjectId/reviews/:reviewId',
                        element: <ProjectReviewScreen />,
                    },
                    {
                        path: '/organizations/:workspaceId/projects/:workspaceProjectId/roblox-avatars',
                        element: <ProjectRobloxAvatarDecksScreen />,
                    },
                ],
            },
            {
                path: 'projects',
                element: <Main />,
                children: [
                    {
                        path: '/projects',
                        element: (
                            <ErrorScreen
                                {...{
                                    title: '404',
                                    message: 'Unable to locate the page you requested.',
                                }}
                            />
                        ),
                    },
                    {
                        path: '/projects/:projectId',
                        element: <ProjectFallbackScreen />,
                    },
                    {
                        path: '/projects/:projectId/models',
                        element: <ProjectFallbackScreen />,
                    },
                    {
                        path: '/projects/:projectId/folders',
                        element: <ProjectFallbackScreen />,
                    },
                    {
                        path: '/projects/:projectId/models/:assetId/ingest',
                        element: <ProjectFallbackScreen />,
                    },
                    {
                        path: '/projects/:projectId/folders/:collectionId',
                        element: <ProjectFallbackScreen />,
                    },
                    {
                        path: '/projects/:projectId/reviews',
                        element: <ProjectFallbackScreen />,
                    },
                    {
                        path: '/projects/:projectId/reviews/:reviewId',
                        element: <ProjectFallbackScreen />,
                    },
                ],
            },
            //Admin Routes
            {
                path: 'admin',
                element: <Admin />,
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
