import { createMigrate } from 'redux-persist';

/**
 * Latest Migration Version is the current Redux RootState
 */

type UserStateV9 = UserState;

type UserStateV8 = Omit<UserStateV9, 'data'> & {
    data: Omit<UserStateV9['data'], 'last_active_at'>;
};

type UserStateV7 = Omit<UserStateV8, 'settings'> & {
    settings: Omit<UserStateV8['settings'], 'alertSounds'>;
};

type UserStateV6 = Omit<UserStateV7, 'data'> & {
    data: Omit<UserStateV7['data'], 'initials'>;
};

type UserStateV5 = Omit<UserStateV6, 'data'> & {
    data: Omit<UserStateV6['data'], 'has_password'>;
};

type UserStateV4 = Omit<UserStateV5, 'data'> & {
    data: Omit<UserStateV5['data'], 'can_trial_organization'>;
};

type UserStateV3 = Omit<UserStateV4, 'data'> & {
    data: Omit<UserStateV4['data'], 'has_available_storage'>;
};

type UserStateV2 = Omit<UserStateV3, 'used_storage' | 'data'> & {
    data: Omit<UserStateV3['data'], 'tier' | 'used_storage' | 'tier_display'>;
};

type UserStateV1 = Omit<UserStateV2, 'settings' | 'verified' | 'name' | 'admin'>;

const persistMigrations = {
    2: (state: UserStateV1): UserStateV2 => {
        return {
            ...state,
            data: {
                _morphType: 'user',
                id: '',
                first: '',
                last: '',
                name: '',
                email: '',
                avatar: null,
                avatar_route: null,
                slug: '',
                is_admin: false,
                is_enabled: false,
                is_verified: false,
                dark_mode: false,
                created_at: '',
                updated_at: '',
                deleted_at: '',
            },
            name: '',
            settings: {
                admin: false,
                verified: false,
                darkMode: true,
            },
        };
    },
    3: (state: UserStateV2): UserStateV3 => {
        return {
            ...state,
            data: {
                ...state.data,
                tier: 'free',
                tier_display: {
                    name: '',
                    storage_limit: 0,
                    storage_limit_human: 'Empty',
                },
                used_storage: {
                    bytes: 0,
                    human: 'Empty',
                },
            },
        };
    },
    4: (state: UserStateV3): UserStateV4 => {
        return {
            ...state,
            data: {
                ...state.data,
                has_available_storage: true,
            },
        };
    },
    5: (state: UserStateV4): UserStateV5 => {
        return {
            ...state,
            data: {
                ...state.data,
                can_trial_organization: true,
            },
        };
    },
    6: (state: UserStateV5): UserStateV6 => {
        return {
            ...state,
            data: {
                ...state.data,
                has_password: true,
            },
        };
    },
    7: (state: UserStateV6): UserStateV7 => {
        return {
            ...state,
            data: state.data && {
                ...state.data,
                initials: null,
            },
        };
    },
    8: (state: UserStateV7): UserStateV8 => {
        return {
            ...state,
            settings: {
                ...state.settings,
                alertSounds: false,
            },
        };
    },
    9: (state: UserStateV8): UserStateV9 => {
        return {
            ...state,
            data: state.data && {
                ...state.data,
                last_active_at: null,
            },
        };
    },
};

type MigrationState =
    | UserStateV1
    | UserStateV2
    | UserStateV3
    | UserStateV4
    | UserStateV5
    | UserStateV6
    | UserStateV7
    | UserStateV8
    | UserStateV9;

export const userMigrate = createMigrate<MigrationState>(persistMigrations, { debug: true });

export const userVersion = 9;
