import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { isMobile } from 'react-device-detect';

type ScreenSize = {
    isSmallScreen: boolean;
    isMobile: boolean;
};

const useScreenSize = (): ScreenSize => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return { isSmallScreen, isMobile };
};

export default useScreenSize;
