import ToolsProvider from '@/providers/ToolsProvider';
import { ThemeProvider } from '@mui/material/styles';
import EchoProvider from '@/providers/EchoProvider';

const RootProvider = ({ children, theme }: { children: ReactNode; theme: ThemeOptions }) => {
    return (
        <ToolsProvider>
            <EchoProvider>
                <ThemeProvider theme={theme}>{children}</ThemeProvider>
            </EchoProvider>
        </ToolsProvider>
    );
};

export default RootProvider;
