import { createListenerMiddleware } from '@reduxjs/toolkit';
import { logout } from '@/redux/reducers/authSlice';
import apiSlice from '@/redux/apiSlice';
import { persistor } from '@/redux/store';

const authMiddleware = createListenerMiddleware();

authMiddleware.startListening({
    actionCreator: logout,
    effect: async (_action, api) => {
        api.cancelActiveListeners();
        apiSlice.util.resetApiState();
        await persistor.purge();
        await persistor.persist();
    },
});

export default authMiddleware;
