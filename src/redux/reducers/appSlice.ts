import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Location } from 'react-router';

const initialState: AppState = {
    drawer: false,
    idle: false,
    maintenance: false,
    maintenanceCheck: null,
    currentGameId: '',
    socket: 'disconnected',
    socketId: null,
    prevPage: null!,
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setMaintenanceMode: (state, action: PayloadAction<boolean>) => {
            state.maintenance = action.payload;
            state.maintenanceCheck = action.payload ? new Date().getTime().toString() : null;
        },
        setEchoStatus: (state, action: PayloadAction<string>) => {
            state.socket = action.payload;
        },
        setSocketId: (state, action: PayloadAction<string | null>) => {
            state.socketId = action.payload;
        },
        updatePage: (state, action: PayloadAction<Location>) => {
            state.prevPage = action.payload;
        },
        setIdle: (state, action: PayloadAction<boolean>) => {
            state.idle = action.payload;
        },
        toggleDrawer: (state) => {
            state.drawer = !state.drawer;
        },
    },
});

export const { setMaintenanceMode, setEchoStatus, setSocketId, updatePage, setIdle, toggleDrawer } = appSlice.actions;

export default appSlice;
