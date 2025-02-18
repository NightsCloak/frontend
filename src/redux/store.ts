import * as Sentry from '@sentry/react';
import apiSlice from '@/redux/apiSlice';
import appSlice from '@/redux/reducers/appSlice';
import authMiddleware from '@/redux/middleware/authMiddleware';
import authSlice, { logout } from '@/redux/reducers/authSlice';
import guestSlice from '@/redux/reducers/guestSlice';
import modelPortalSlice from '@/redux/reducers/modelPortalSlice';
import storage from 'redux-persist/lib/storage';
import userSlice from '@/redux/reducers/userSlice';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import { authMigrate, authVersion } from './migrations/authMigration';
import { combineSlices, configureStore, UnknownAction } from '@reduxjs/toolkit';
import { guestMigrate, guestVersion } from './migrations/guestMigration';
import { maintenanceMiddleware } from './middleware/maintenanceMiddleware';
import { modelPortalMigrate, modelPortalVersion } from '@/redux/migrations/modelPortalMigration';
import { setupListeners } from '@reduxjs/toolkit/query';
import { userMigrate, userVersion } from './migrations/userMigration';
import adminSlice from '@/redux/reducers/adminSlice';

const sentryReduxEnhancer = Sentry.createReduxEnhancer({
    actionTransformer: (action): UnknownAction | null => {
        // Let's *not* send sensitive data to sentry, like passwords
        const exceptions = [
            'login',
            'resetPassword',
            'register',
            'updateUserPassword',
            'setUserPassword',
            'deleteUserAccount',
        ];
        if (exceptions.includes(action?.meta?.arg?.endpointName)) {
            return {
                ...action,
                meta: {
                    ...action.meta,
                    arg: {
                        ...action.meta.arg,
                        originalArgs: {
                            ...action.meta.arg.originalArgs,
                            ...(action.meta.arg.originalArgs.password && {
                                password: '******',
                            }),
                            ...(action.meta.arg.originalArgs.password_confirmation && {
                                password_confirmation: '******',
                            }),
                            ...(action.meta.arg.originalArgs.current_password && {
                                current_password: '******',
                            }),
                        },
                    },
                },
            };
        }
        return action;
    },
});

// const appPersistConfig = {
//     key: 'app',
//     storage: storage,
//     version: appVersion,
//     migrate: appMigrate,
// };

const authPersistConfig = {
    key: 'auth',
    storage: storage,
    version: authVersion,
    migrate: authMigrate,
};

const guestPersistConfig = {
    key: 'guest',
    storage,
    version: guestVersion,
    migrate: guestMigrate,
};

const userPersistConfig = {
    key: 'user',
    storage,
    version: userVersion,
    migrate: userMigrate,
};

const modelPortalPersistConfig = {
    key: 'modelPortal',
    storage,
    version: modelPortalVersion,
    migrate: modelPortalMigrate,
};

export const reducers = combineSlices({
    [apiSlice.reducerPath]: apiSlice.reducer,
    app: appSlice.reducer,
    auth: persistReducer(authPersistConfig, authSlice.reducer),
    guest: persistReducer(guestPersistConfig, guestSlice.reducer),
    modelPortal: persistReducer(modelPortalPersistConfig, modelPortalSlice.reducer),
    user: persistReducer(userPersistConfig, userSlice.reducer),
    admin: adminSlice.reducer,
});

if (import.meta.env.VITE_APP === 'admin') {
    reducers.inject({ reducer: adminSlice.reducer, reducerPath: 'admin' });
}

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export const rootReducer = (state: any, action: any) => {
    if (logout.match(action)) {
        state = undefined;
    }

    return reducers(state, action);
};

export const store = configureStore({
    reducer: rootReducer,
    devTools: import.meta.env.VITE_DEPLOY_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat([apiSlice.middleware, authMiddleware.middleware, maintenanceMiddleware]),
    enhancers: (getDefaultEnhancers) => getDefaultEnhancers().concat(sentryReduxEnhancer),
});

// const persistedReducer = persistReducer(rootPersistConfig, rootReducer)

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ReturnType<typeof store.dispatch>;

setupListeners(store.dispatch);
