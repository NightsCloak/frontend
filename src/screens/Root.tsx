import { useAppSelector } from '@/redux/hooks';
import LandingScreen from '@/screens/LandingScreen';
import Dashboard from '@/screens/users/Dashboard';

const Root = () => {
    const auth = useAppSelector((state) => state.auth);

    if (auth.status) {
        return <Dashboard />;
    }

    return <LandingScreen />;
};

export default Root;
