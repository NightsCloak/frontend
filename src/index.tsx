import React from 'react';
import { createRoot } from 'react-dom/client';
import reportWebVitals from '@/reportWebVitals';
import TimeAgo from 'javascript-time-ago';
import * as Sentry from '@sentry/react';

// English.
import en from 'javascript-time-ago/locale/en';
import { LicenseInfo } from '@mui/x-license';
import { Provider } from 'react-redux';
import { persistor, store } from '@/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import Router from '@/Router';
import routes from '@/config/routes';

process.env.NODE_ENV === 'production' &&
    Sentry.init({
        dsn: 'https://189679606c188c3d5ef98c81b2cfb8ee@o4508838011863040.ingest.us.sentry.io/4508838013173765',
        environment: import.meta.env.VITE_DEPLOY_ENV,
        integrations: [Sentry.browserTracingIntegration(), Sentry.replayIntegration()],
        release: import.meta.env.GITHUB_SHA,
        // Tracing
        tracesSampleRate: 1.0, //  Capture 100% of the transactions
        // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
        tracePropagationTargets: [/^https:\/\/nightscloak\.com\/api/, /^https:\/\/nightscloak\.dev\/api/],
        // Session Replay
        replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
        replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
        normalizeDepth: 10,
    });

LicenseInfo.setLicenseKey(
    'e0d9bb8070ce0054c9d9ecb6e82cb58fTz0wLEU9MzI0NzIxNDQwMDAwMDAsUz1wcmVtaXVtLExNPXBlcnBldHVhbCxLVj0y'
);

TimeAgo.addDefaultLocale(en);

const root = createRoot(document.getElementById('root') as HTMLElement);

if (window.location.host.startsWith('www')) {
    window.location.assign(`${window.location.protocol}//${window.location.host.slice(4)}${window.location.pathname}`);
}

// console.log('env', import.meta.env);
window.console.log = import.meta.env.MODE === 'production' ? () => {} : console.log;

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Router routeConfig={routes} />
            </PersistGate>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
