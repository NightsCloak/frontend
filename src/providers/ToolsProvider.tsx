import { ReactNode, useCallback, useEffect, useEffectEvent, useLayoutEffect, useMemo, useRef, useState } from 'react';
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
    const currentDate = useCallback(() => Date.now(), []);
    const lastActivityTime = useRef<number>(currentDate());
    const [tools, setTools] = useState<ReactNode | null>(null);
    const [modal, setModal] = useState<ReactNode | null>(null);
    const [breadcrumbs, setBreadcrumbs] = useState<ReactNode | undefined>();
    const [previousLocation, updatePreviousLocation] = useState<Location>(null!);
    const [tabTitle, setTabTitle] = useState<ToolsContextType['tabTitle']>(null);
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

    const handlePageChanged = useEffectEvent(() => {
        if (location?.pathname) {
            updatePreviousLocation(location);
            updateTabTitle(null);
            updateTools(null);
            if (!location.pathname.includes(previousLocation?.pathname)) {
                updateBreadcrumbs([]);
            }
        }
    });

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

    useEffect(() => {
        console.log('location changed', previousLocation?.pathname);
        if (location?.pathname !== previousLocation?.pathname) {
            handlePageChanged();
        }
    }, [location.pathname]);

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
