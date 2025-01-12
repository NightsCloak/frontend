import routes from '@/config/routes';
import { persistor, store as intractStore } from '@intractinc/base/redux/store';
import Router from '@intractinc/base/Router';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

const store = intractStore;

const Main = () => {
    if (import.meta.env.VITE_APP !== 'admin') {
        throw new Error('Invalid App');
    }
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Router config={{}} routeConfig={routes} />
            </PersistGate>
        </Provider>
    );
};

export default Main;
