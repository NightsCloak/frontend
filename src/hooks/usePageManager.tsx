import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router';

type PageInfo = { title: string; display?: string };

interface PagesType {
    [key: string]: { title: string; display?: string };
}

const usePageManager = () => {
    const location = useLocation();
    const [pages, setPages] = useState<PagesType>({ '/home': { title: '' } });

    useEffect(() => {}, [location]);

    const updatePage = useCallback(
        ({ title, display }: PageInfo) => {
            setPages({
                ...pages,
                [location.pathname]: {
                    title,
                    display,
                },
            });
        },
        [location]
    );

    return { updatePage };
};

export default usePageManager;
