import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { RootState } from '@/redux/store';
import { setMaintenanceMode } from '@/redux/reducers/appSlice';
import parseUrl from '@/utils/parseUrl';

const baseUrl = `${import.meta.env.VITE_SCHEMA}://${import.meta.env.VITE_URI}${
    import.meta.env.VITE_PORT ? `:${import.meta.env.VITE_PORT}` : ''
}`;
const prefixedUrl = `${baseUrl}/`;

const exceptions: string[] = [];
// type ApiType = BaseQueryApi & { extra: { refresh?: LoginResponse } };

// Base query override
const baseQuery = fetchBaseQuery({
    baseUrl: prefixedUrl,
    prepareHeaders: (headers, api) => {
        //Get Tokens and SocketID from store
        const state = api.getState() as RootState;
        const xsrfToken = (state.auth as AuthState).xsrfToken;
        const pkceToken = (state.auth as AuthState).pkce.accessToken;
        const socketId = (state.app as AppState).socketId;
        const idle = (state.app as AppState).idle;

        //Set auth token for all requests
        if (xsrfToken) {
            // headers.set('authorization', `Bearer ${token}`);
            headers.set('X-XSRF-TOKEN', xsrfToken);
        } else if (pkceToken) {
            headers.set('Authorization', `Bearer ${pkceToken}`);
        }


        if (idle) {
            headers.set('X-OWBN-Is-Idle', 'yes');
        }

        //Required for socket
        if (socketId) {
            headers.set('X-Socket-ID', socketId);
        }

        //Did we get a new auth token passed?  Let's use that in case store is stale
        // if ((api as ApiType)?.extra?.refresh) {
        //     headers.set('authorization', `Bearer ${(api as ApiType).extra.refresh?.access_token ?? ''}`);
        // }

        if (!exceptions.includes(api.endpoint)) {
            headers.set('content-type', 'application/json');
        }

        headers.set('accept', 'application/json');

        headers.set('X-Referer-Path', window.location.href);

        return headers;
    },
    credentials: 'include',
});

//TODO: simplify into helper functions and encapsulate in a try catch
const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions
) => {
    let url: string = null!;
    [url, args] = parseUrl(api, args, url);

    // Make Api Call
    let result = await baseQuery(args, api, extraOptions);

    //Grab Cookies
    if (import.meta.env.VITE_AUTH_FLOW !== 'pkce') {
        if (url === 'oauth/heartbeat' || url === 'oauth/logout') {
            const cookies = document.cookie.split('; ');

            for (const item in cookies) {
                const cookie = cookies[item].split('=');
                cookie[1] = cookie[1].replace('%3D', '=');

                if (cookie[0] === 'XSRF-TOKEN' && cookie[1] !== (api.getState() as RootState).auth.xsrfToken) {
                    // console.log('token update?', cookie[1]);
                    api.dispatch({ type: 'auth/setXSRFToken', payload: cookie[1] });
                }
            }
        }
    }

    // // Did we get a 401 not authorized?
    if (result.error && result.error.status === 401) {
        if (import.meta.env.VITE_AUTH_FLOW === 'pkce') {
            // Handle PKCE 401
        } else {
            const refreshResult = await baseQuery(
                {
                    url: `${baseUrl}/oauth/heartbeat`,
                    method: 'GET',
                },
                api,
                extraOptions
            );

            //Refresh was successful, dispatch original request again

            const handleXsrf = () => {
                const cookies = document.cookie.split('; ');

                for (const item in cookies) {
                    const cookie = cookies[item].split('=');
                    cookie[1] = cookie[1].replace('%3D', '=');

                    if (cookie[0] === 'XSRF-TOKEN' && cookie[1] !== (api.getState() as RootState).auth.xsrfToken) {
                        api.dispatch({ type: 'auth/setXSRFToken', payload: cookie[1] });
                    }
                }
            };

            if ((refreshResult.data as Heartbeat).auth) {
                handleXsrf();

                api.extra = { refresh: refreshResult.data };

                result = await baseQuery(args, api, extraOptions);
                if (result.error) {
                    console.log('error', result.error);
                }
            } else {
                //Refresh failed, logout
                api.dispatch({ type: 'auth/logout' });
                handleXsrf();
            }
        }
    }

    if (result.error && result.error.status === 503) {
        api.dispatch(setMaintenanceMode(true));
    }
    //always return result
    return result;
};

export const customBaseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions: object
) => {
    const app = (api.getState() as RootState).app;
    if (app.maintenance && app.maintenanceCheck) {
        parseInt(app.maintenanceCheck) > new Date().getTime() && api.abort();
    }
    return baseQueryWithReauth(args, api, extraOptions);
};

const apiSlice = createApi({
    reducerPath: 'api',
    tagTypes: ['User', 'Chronicles', 'Chronicle'],
    baseQuery: customBaseQuery,
    endpoints: (_builder) => ({}),
});

export default apiSlice;
// export const {} = apiSlice -- placeholder in case endpoints are added
