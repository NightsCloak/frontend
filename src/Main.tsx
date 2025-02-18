import routes from '@/config/routes';
import { persistor, store as ncStore } from '@/redux/store';
import Router from '@/Router';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

const store = ncStore;

const Main = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Router config={{}} routeConfig={routes} />
            </PersistGate>
        </Provider>
    );
};

export default Main;
