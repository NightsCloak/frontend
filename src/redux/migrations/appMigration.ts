import { createMigrate } from 'redux-persist';

/**
 * Latest Migration Version is the current Redux RootState
 */

type AppRootStateV4 = AppState;

type AppRootStateV3 = Omit<AppRootStateV4, 'idle'>;

type AppRootStateV2 = Omit<AppRootStateV3, 'socket' & 'socketId'>;

type AppRootStateV1 = Omit<AppRootStateV2, 'drawer' & 'theme' & 'currentGameId'>;

const persistMigrations = {
    2: async (state: AppRootStateV1): Promise<AppRootStateV2> => ({
        ...state,
        maintenance: false,
    }),
    3: async (state: AppRootStateV2): Promise<AppRootStateV3> => ({
        ...state,
        socket: 'disconnected',
        socketId: null,
    }),
    4: async (state: AppRootStateV3): Promise<AppRootStateV4> => ({
        ...state,
        idle: false,
    }),
};

type MigrationState = AppRootStateV1 | AppRootStateV2 | AppRootStateV3 | AppRootStateV4;

export const appMigrate = createMigrate<MigrationState>(persistMigrations);

export const appVersion = 4;
