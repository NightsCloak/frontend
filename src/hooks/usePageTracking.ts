import { useEffect, useState } from 'react';
import ReactGA from 'react-ga4';
import { useAppSelector } from '@/redux/hooks';

const usePageTracking = () => {
    const [initialized, setInitialized] = useState(false);
    const auth = useAppSelector((state) => state.auth);
    const user = useAppSelector((state) => state.user);

    useEffect(() => {
        if (
            // !window.location.href.includes('localhost') &&
            // !window.location.href.includes('127.0.0.1') &&
            !initialized
        ) {
            //Fallback to dev if not defined
            if(import.meta.env.VITE_ANALYTICS_ID && import.meta.env.VITE_ANALYTICS_ID !== ''){
                ReactGA.initialize(import.meta.env.VITE_ANALYTICS_ID, {
                    gtagOptions: {
                        userId: user.data?.id ?? '',
                    },
                });

            }

            setInitialized(true);
        }
    }, [user, auth, initialized]);

    //Set User ID
    useEffect(() => {
        if (initialized && auth) {
            console.log('updated analytics userID');
            ReactGA.set({
                userId: user.data?.id ? user.data.id : undefined,
            });
        }
    }, [auth, initialized, user.data?.id]);
};

export default usePageTracking;
