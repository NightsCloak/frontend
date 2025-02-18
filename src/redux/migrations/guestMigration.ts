import { createMigrate } from 'redux-persist';

/**
 * Latest Migration Version is the current Redux RootState
 */

type GuestRootStateV2 = GuestState;

type GuestRootStateV1 = Omit<GuestRootStateV2, 'initials'>;

const persistMigrations = {
    2: (state: GuestRootStateV1): GuestRootStateV2 => {
        return {
            ...state,
            initials: 'X',
        };
    },
};

type MigrationState = GuestRootStateV1 | GuestRootStateV2;

export const guestMigrate = createMigrate<MigrationState>(persistMigrations);

export const guestVersion = 2;
