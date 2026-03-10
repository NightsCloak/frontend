import { ActionReducerMapBuilder, createSlice, PayloadAction } from '@reduxjs/toolkit';
import authApi from '@/redux/features/authApi';

const initialState: AuthState = {
    status: false,
    xsrfToken: null,
    redirect: null,
    intended: null,
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
};

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setXSRFToken: (state, action: PayloadAction<string>) => {
            state.xsrfToken = action.payload;
        },
        setAuth: (state, action: PayloadAction<boolean>) => {
            state.status = action.payload;
        },
        setRedirect: (state, action: PayloadAction<string | null>) => {
            state.redirect = action.payload;
        },
        setIntended: (state, action: PayloadAction<string | null>) => {
            state.intended = action.payload;
        },
        logout: (state) => {
            state.status = false;
            state.xsrfToken = null;
            state.redirect = null;
            state.intended = null;
            state.pkce = {
                lastCheck: null!,
                accessToken: null!,
                refreshToken: null!,
                expiresIn: null!,
                challenge: {
                    codeChallenge: null!,
                    codeVerifier: null!,
                },
                challenge_state: null!,
            };
        },
        clearXSRF: (state) => {
            state.xsrfToken = null;
        },
        updatePKCE: (
            state,
            action: PayloadAction<{ challenge: AuthState['pkce']['challenge']; challenge_state: string }>
        ) => {
            state.pkce.challenge = action.payload.challenge;
            state.pkce.challenge_state = action.payload.challenge_state;
        },
        refreshPkce: (state, action: PayloadAction<PkceAuthResponse>) => {
            state.status = true;
            state.pkce.accessToken = action.payload.access_token;
            state.pkce.refreshToken = action.payload.refresh_token;
            state.pkce.expiresIn = JSON.stringify(new Date(action.payload.expires_in));
            state.pkce.lastCheck = JSON.stringify(new Date());
        },
    },
    extraReducers: (builder: ActionReducerMapBuilder<AuthState>) => {
        builder
            .addMatcher(authApi.endpoints.heartbeat.matchFulfilled, (state, { payload }) => {
                state.status = payload.auth;
            })
            .addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
                state.status = false;
                state.redirect = null;
                state.intended = null;
            })
            .addMatcher(authApi.endpoints.thirdPartyOauthCallback.matchFulfilled, (state, action) => {
                state.status = true;
                state.pkce.accessToken = action.payload.access_token ?? '';
                state.pkce.refreshToken = null;
                state.pkce.expiresIn = null;
                state.pkce.lastCheck = JSON.stringify(new Date());
            })
            .addMatcher(authApi.endpoints.getToken.matchFulfilled, (state, { payload }) => {
                state.status = true;
                state.pkce.accessToken = payload.access_token;
                state.pkce.refreshToken = payload.refresh_token;
                state.pkce.expiresIn = JSON.stringify(new Date(payload.expires_in));
                state.pkce.lastCheck = JSON.stringify(new Date());
            });
    },
});

export default authSlice;
export const { clearXSRF, logout, setRedirect, setIntended, setXSRFToken, updatePKCE, refreshPkce, setAuth } =
    authSlice.actions;
