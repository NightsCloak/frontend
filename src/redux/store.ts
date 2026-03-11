import * as Sentry from '@sentry/react';
import apiSlice from '@/redux/apiSlice';
import appSlice from '@/redux/reducers/appSlice';
import authMiddleware from '@/redux/middleware/authMiddleware';
import authSlice, { logout } from '@/redux/reducers/authSlice';
import storage from 'redux-persist/lib/storage';
import userSlice from '@/redux/reducers/userSlice';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import { authMigrate, authVersion } from './migrations/authMigration';
import { combineSlices, configureStore, UnknownAction } from '@reduxjs/toolkit';
import { maintenanceMiddleware } from './middleware/maintenanceMiddleware';
import { setupListeners } from '@reduxjs/toolkit/query';
import { userMigrate, userVersion } from './migrations/userMigration';
import { appMigrate, appVersion } from '@/redux/migrations/appMigration';

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

const appPersistConfig = {
    key: 'app',
    storage,
    version: appVersion,
    migrate: appMigrate,
};

const authPersistConfig = {
    key: 'auth',
    storage: storage,
    version: authVersion,
    migrate: authMigrate,
};

const userPersistConfig = {
    key: 'user',
    storage,
    version: userVersion,
    migrate: userMigrate,
};

export const reducers = combineSlices({
    [apiSlice.reducerPath]: apiSlice.reducer,
    app: persistReducer(appPersistConfig, appSlice.reducer),
    auth: persistReducer(authPersistConfig, authSlice.reducer),
    user: persistReducer(userPersistConfig, userSlice.reducer),
});

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
