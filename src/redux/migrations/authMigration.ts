import { createMigrate } from 'redux-persist';

/**
 * Latest Migration Version is the current Redux RootState
 */

type AuthRootStateV3 = AuthState;

type AuthRootStateV2 = Omit<AuthRootStateV3, 'pkce'>;

type AuthRootStateV1 = Omit<AuthRootStateV2, 'xsrfToken' & 'redirect'> & {
    status: boolean;
    lastCheck: Date | null;
    accessToken: string | null;
    refreshToken: string | null;
    expiresIn: number;
};

const persistMigrations = {
    2: async (): Promise<AuthRootStateV2> => ({
        status: false,
        xsrfToken: null,
        redirect: null,
    }),
    3: async (): Promise<AuthRootStateV3> => ({
        status: false,
        xsrfToken: null,
        redirect: null,
        pkce: {
            lastCheck: null!,
            accessToken: null!,
            refreshToken: null!,
            expiresIn: null!,
            challenge: {
                codeChallenge: null!,
                codeVerifier: null!,
            },
            challenge_state: null!,
        },
    }),
};

type MigrationState = AuthRootStateV1 | AuthRootStateV2 | AuthRootStateV3;

export const authMigrate = createMigrate<MigrationState>(persistMigrations);

export const authVersion = 3;
