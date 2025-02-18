import { createMigrate } from 'redux-persist';

/**
 * Latest Migration Version is the current Redux RootState
 */

type ModelPortalStateV2 = ModelPortalState;

type ModelPortalStateV1 = Omit<ModelPortalStateV2, 'dockAnnotation'>;

const persistMigrations = {
    2: (state: ModelPortalStateV1): ModelPortalStateV2 => {
        return {
            ...state,
            dockAnnotation: null,
        };
    },
};

type MigrationState = ModelPortalStateV1 | ModelPortalStateV2;

export const modelPortalMigrate = createMigrate<MigrationState>(persistMigrations);

export const modelPortalVersion = 2;
