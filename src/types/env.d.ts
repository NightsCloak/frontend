/// <reference types="vite/client" />

import type ImportMetaVite from 'vite/types/importMeta';

import type {
    Dispatch as ReactDispatch,
    ReactElement as ReactReactElement,
    ReactNode as ReactReactNode,
    RefObject as ReactRefObject,
    SetStateAction as ReactSetStateAction,
} from 'react';
import type { PresenceChannel as EchoPresenceChannel } from 'laravel-echo/dist/channel';
import type { default as LaravelEcho } from 'laravel-echo';
import type { IndexRouteObject, Location as ReactRoutertLocation, NonIndexRouteObject } from 'react-router';
import type { Theme as MuiTheme, ThemeOptions as MuiThemeOptions } from '@mui/material';

interface ImportMetaEnv {
    readonly VITE_APP: 'admin' | 'frontend';
    readonly VITE_URI: string;
    readonly VITE_PORT?: string;
    readonly VITE_SCHEMA: string;
    readonly VITE_PREFIX: string;
    readonly VITE_CLIENT_ID: string;
    readonly VITE_CLIENT_SECRET: string;
    readonly VITE_PUSHER_APP_KEY: string;
    readonly VITE_PUSHER_APP_WSS_PORT: string;
    readonly VITE_PUSHER_APP_WS_PORT: string;
    readonly VITE_PUSHER_APP_PATH: string;
    readonly VITE_DEPLOY_ENV: string;
    readonly VITE_SENTRY: string;
    readonly VITE_SENTRY_TELEMETRY: string;
    readonly VITE_SENTRY_SOURCE_MAPS: string;
    readonly VITE_REG_OPEN: string;
    readonly VITE_STRIPE_PK: string;
    readonly VITE_DISABLE_WEBSOCKETS?: string;
    readonly VITE_DEV_USERNAME?: string;
    readonly VITE_DEV_PASSWORD?: string;
    readonly VITE_DEV_SAFARI?: string;
    readonly VITE_ANALYTICS_ID?: string;
    readonly VITE_AUTH_FLOW?: string;
    readonly VITE_PKCE_LOCAL_ID?: string;
    readonly GITHUB_SHA?: string;
    readonly STORYBOOK?: 'true' | 'false';
    readonly VITE_STORYBOOK_TOKEN_TYPE?: string;
    readonly VITE_STORYBOOK_TOKEN_EXPIRES_IN?: number;
    readonly VITE_STORYBOOK_ACCESS_TOKEN?: string;
    readonly VITE_STORYBOOK_REFRESH_TOKEN?: string;
}

declare global {
    interface ImportMeta extends ImportMetaVite {
        readonly env: ImportMetaEnv;
    }

    type RouteObject = IndexRouteObject | NonIndexRouteObject;
    type Theme = MuiTheme;

    interface ColorSelectionOptions {
        signal?: AbortSignal;
    }

    interface ColorSelectionResult {
        sRGBHex: string;
    }

    interface EyeDropper {
        open: (options?: ColorSelectionOptions) => Promise<ColorSelectionResult>;
    }

    interface EyeDropperConstructor {
        new (): EyeDropper;
    }

    interface Window {
        EyeDropper?: EyeDropperConstructor | undefined;
    }
    

    type Dispatch<A> = ReactDispatch<A>;
    type ReactElement<P, T> = ReactReactElement<P, T>;
    type ReactNode = ReactReactNode;
    type SetStateAction<S> = ReactSetStateAction<S>;
    type PresenceChannel = EchoPresenceChannel;
    type Echo<T> = LaravelEcho<T>;
    type RefObject<T> = ReactRefObject<T>;
    type NCLocation<S> = ReactRoutertLocation<S>;
    type ThemeOptions = MuiThemeOptions;



}

