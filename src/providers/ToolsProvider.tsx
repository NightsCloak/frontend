import { ReactNode, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Location, useLocation } from 'react-router';
import BreadcrumbItem, { BreadcrumbItemProps } from '@/layout/navbar/BreadcrumbItem';
import chimeFile from '/sounds/chime.wav?url';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import ToolsContext from '@/contexts/ToolsContext';
import { setIdle } from '@/redux/reducers/appSlice';

const ToolsProvider = ({ children }: ToolsProps) => {
    const location = useLocation();
    const playSounds = useAppSelector((state) => state.user.settings.alertSounds);
    const dispatch = useAppDispatch();
    const lastActivityTime = useRef<number>(Date.now());
    const [tools, setTools] = useState<ReactNode | null>(null);
    const [modal, setModal] = useState<ReactNode | null>(null);
    const [breadcrumbs, setBreadcrumbs] = useState<ReactNode | undefined>();
    const [previousLocation, updatePreviousLocation] = useState<Location>(null!);
    const [tabTitle, setTabTitle] = useState<ToolsContextType['tabTitle']>(null);
    const [currentPath, setCurrentPath] = useState<string>('');
    const chime = useMemo(() => {
        const audio = new Audio(chimeFile);
        audio.volume = 0.3;

        return audio;
    }, []);

    const playChime = () => playSounds && chime.readyState === 4 && chime.play();

    const updateTools = (updatedTools: ReactNode) => {
        setTools(updatedTools);
    };

    const updateModal = (modal: ReactNode | null) => {
        setModal(modal);
    };

    const updateBreadcrumbs = (breadcrumbs: BreadcrumbItemProps[]) => {
        setBreadcrumbs(
            breadcrumbs
                ?.filter((breadcrumb) => !breadcrumb.skip)
                .map((breadcrumb, index) => (
                    <BreadcrumbItem
                        key={`breadcrumb_${index}`}
                        {...{
                            type: breadcrumb.type,
                            name: breadcrumb.name,
                            avatar: breadcrumb.avatar,
                            avatars: breadcrumb.avatars,
                            uri: breadcrumb.uri,
                            skeleton: breadcrumb.skeleton,
                            chip: breadcrumb.chip,
                            grayscale: breadcrumb.grayscale,
                            skip: breadcrumb.skip,
                        }}
                    />
                ))
        );
    };

    const updateTabTitle = (title: string | null) => {
        setTabTitle(title);
    };

    const updateActivity = () => {
        lastActivityTime.current = Date.now();
    };

    const checkInactivity = () => {
        const currentTime = Date.now();
        const inactivityDuration = currentTime - lastActivityTime.current;
        const isInactive = inactivityDuration >= 10 * 60 * 1000; // 10 minutes

        dispatch(setIdle(isInactive));
    };

    useEffect(() => {
        const events = ['mousemove', 'mousedown', 'keydown', 'touchmove', 'touchstart'];

        events.forEach((event) => window.addEventListener(event, updateActivity));

        return () => {
            events.forEach((event) => window.removeEventListener(event, updateActivity));
        };
    }, []);

    useEffect(() => {
        const inactivityCheckInterval = setInterval(checkInactivity, 60 * 1000);

        return () => {
            clearInterval(inactivityCheckInterval);
        };
    }, []);

    useLayoutEffect(() => {
        if (tabTitle) {
            document.title = `OWBN - ${tabTitle}`;
        } else {
            document.title = 'OWBN';
        }
    }, [tabTitle]);

    useLayoutEffect(() => {
        if (location !== previousLocation) {
            //Page Changed
            updatePreviousLocation(location);
            if (location.pathname !== currentPath) {
                updateTabTitle(null);
                updateTools(null);
                setCurrentPath(location.pathname);
            }
        }
    }, [location]);

    return (
        <ToolsContext
            value={{
                tools,
                updateTools,
                updateTabTitle,
                tabTitle,
                breadcrumbs,
                updateBreadcrumbs,
                playChime,
                modal,
                updateModal,
            }}
        >
            {children}
        </ToolsContext>
    );
};

export default ToolsProvider;
