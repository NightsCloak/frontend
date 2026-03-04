import routes from '@/config/routes';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/redux/store';
import Router from '@/Router';

const Entry = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Router config={{}} routeConfig={routes} />
            </PersistGate>
        </Provider>
    );
};

export default Entry;
