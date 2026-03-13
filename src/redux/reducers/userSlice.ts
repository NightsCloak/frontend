import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';
import userApi from '@/redux/features/user';
import auth from '@/redux/features/auth';

const initialState: UserState = {
    data: null!,
    name: null!,
    settings: {
        admin: false,
        verified: null,
        darkMode: true,
        alertSounds: false,
        listView: false,
    },
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        toggleDarkMode: (state: Draft<UserState>, action: PayloadAction<boolean | undefined>) => {
            state.settings = {
                ...state.settings,
                darkMode: action.payload ?? !state.settings.darkMode,
            };
        },
        toggleAlertSounds: (state: Draft<UserState>, action: PayloadAction<boolean | undefined>) => {
            state.settings = {
                ...state.settings,
                alertSounds: action.payload ?? !state.settings.alertSounds,
            };
        },
        toggleListView: (state, action: PayloadAction<boolean | undefined>) => {
            state.settings = { ...state.settings, listView: action.payload ?? !state.settings.listView };
        },
        logout: (state: Draft<UserState>) => {
            state.data = null!;
            state.name = null!;
            state.settings = {
                admin: false,
                verified: null,
                darkMode: true,
                alertSounds: false,
                listView: false,
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(auth.endpoints.logout.matchFulfilled, (state: Draft<UserState>) => {
                state.data = null!;
                state.name = null!;
                state.settings = {
                    admin: false,
                    verified: null,
                    darkMode: true,
                    alertSounds: false,
                    listView: false,
                };
            })
            .addMatcher(userApi.endpoints.getUser.matchFulfilled, (state: Draft<UserState>, { payload }) => {
                state.name = payload.name;
                state.settings = {
                    admin: payload.is_admin,
                    verified: payload.is_verified,
                    darkMode: payload.dark_mode ?? state.settings.darkMode ?? true,
                    alertSounds: state.settings.alertSounds ?? false,
                    listView: state.settings.listView ?? false,
                };
                state.data = payload;
            });
    },
});

export default userSlice;

export const { logout, toggleDarkMode, toggleAlertSounds, toggleListView } = userSlice.actions;
