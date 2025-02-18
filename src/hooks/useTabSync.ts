import { useEffect } from 'react';

const useTabSync = () => {
    //Handler for Multiple Tabs
    useEffect(() => {
        const storageListener = (e: StorageEvent) => {
            // console.log('persist', e);
            if (e.key === 'persist:auth') {
                if (e.newValue === null) {
                    // window.location.reload();
                    return;
                }
                const newAuth: Omit<AuthState, 'status'> & { status: boolean | string } = JSON.parse(
                    e.newValue ?? '{}'
                );
                const oldAuth: Omit<AuthState, 'status'> & { status: boolean | string } = JSON.parse(
                    e.oldValue ?? '{}'
                );
                if (newAuth.status === 'true' && oldAuth.status === 'false') {
                    window.location.reload();
                }
            }
        };
        window.addEventListener('storage', storageListener);

        return () => {
            window.removeEventListener('storage', storageListener);
        };
    }, []);
};

export default useTabSync;
