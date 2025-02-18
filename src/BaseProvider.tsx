import ToolsProvider from '@/providers/ToolsProvider';
import usePageTracking from '@/hooks/usePageTracking';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import useTabSync from '@/hooks/useTabSync';
import { useEffect, useMemo } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material';
import { clearXSRF } from '@/redux/reducers/authSlice';
import { toggleDarkMode } from '@/redux/reducers/userSlice';
import defaultTheme from '@/config/theme';
import { useHeartbeatQuery } from '@/redux/features/auth';
import EchoProvider from '@/providers/EchoProvider';

const BaseProvider = ({
    children,
    configTheme,
    theme,
}: {
    children: ReactNode;
    configTheme?: (darkMode: boolean) => ThemeOptions;
    theme?: ThemeOptions;
}) => {
    //Init Redux
    useHeartbeatQuery(undefined, { pollingInterval: 300000 });

    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.user);

    usePageTracking();
    useTabSync();

    //Get OS Dark/Lite mode as initial default
    const osDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const prefersDarkMode = useMemo(() => {
        return user.settings.darkMode ?? osDarkMode;
    }, [osDarkMode, user.settings.darkMode]);

    useEffect(() => {
        return () => {
            //Clear XSRF So it's not set for next session
            dispatch(clearXSRF());
        };
    }, []);

    const generatedTheme = useMemo(() => {
        const darkMode = user.settings.darkMode ?? prefersDarkMode;

        //Storybook handles theme switching
        if (theme) {
            return createTheme(theme);
        }

        // We got the theme from the app
        if (configTheme) {
            return createTheme(configTheme(darkMode));
        }

        return createTheme(defaultTheme(darkMode));
    }, [prefersDarkMode, user.settings.darkMode, theme]);

    useEffect(() => {
        dispatch(toggleDarkMode(prefersDarkMode));
    }, [prefersDarkMode]);

    return (
        <ToolsProvider>
            <EchoProvider>
                <ThemeProvider theme={generatedTheme}>{children}</ThemeProvider>
            </EchoProvider>
        </ToolsProvider>
    );
};

export default BaseProvider;
