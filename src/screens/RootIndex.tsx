import { useAppSelector } from '@/redux/hooks';
import LandingScreen from '@/screens/LandingScreen';
import AdminDashboard from '@/screens/AdminDashboard';

const RootIndex = () => {
    const auth = useAppSelector((state) => state.auth);

    if (auth.status) {
        return <AdminDashboard />;
    }

    return <LandingScreen />;
};

export default RootIndex;
