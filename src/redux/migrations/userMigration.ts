import {createMigrate} from 'redux-persist';

/**
 * Latest Migration Version is the current Redux RootState
 */

type UserStateV1 = UserState;

const persistMigrations = {};

type MigrationState = UserStateV1;

export const userMigrate = createMigrate<MigrationState>(persistMigrations, { debug: true });

export const userVersion = 9;
