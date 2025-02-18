import { createSlice } from '@reduxjs/toolkit';
import authApi from '@/redux/features/auth';

const initialState: GuestState = {
    id: null,
    name: null,
    api_secret: null,
    initials: null,
};

const guestSlice = createSlice({
    name: 'guest',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addMatcher(authApi.endpoints.heartbeat.matchFulfilled, (state, { payload }: { payload: Heartbeat }) => {
                if (!payload.guest) {
                    state.id = null;
                    state.name = null;
                    state.api_secret = null;
                    state.initials = null;
                }
            })
            .addMatcher(authApi.endpoints.guest.matchFulfilled, (state, { payload }: { payload: Guest }) => {
                state.id = payload.id;
                state.name = payload.name;
                state.api_secret = payload.api_secret;
                state.initials = payload.initials;
            })
            .addMatcher(authApi.endpoints.login.matchFulfilled, (state) => {
                state.id = null;
                state.name = null;
                state.api_secret = null;
                state.initials = null;
            })
            .addMatcher(authApi.endpoints.googleLoginCallback.matchFulfilled, (state) => {
                state.id = null;
                state.name = null;
                state.api_secret = null;
                state.initials = null;
            });
    },
});

export default guestSlice;
// eslint-disable-next-line no-empty-pattern
export const {} = guestSlice.actions;
