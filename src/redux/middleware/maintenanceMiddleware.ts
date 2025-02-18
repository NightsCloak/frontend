import { isAction, Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import { setMaintenanceMode } from '@/redux/reducers/appSlice';
import { RootState } from '@/redux/store';

export const maintenanceMiddleware: Middleware =
    (api: MiddlewareAPI) => (next) => (action) => {
        // Did we Reject?
        if (isAction(action)) {
            if (
                action.type === 'api/executeQuery/fulfilled' &&
                (api.getState() as RootState).app.maintenance
            ) {
                api.dispatch(setMaintenanceMode(false));
            }
        }
        return next(action);
    };
