import { useAppSelector } from '@intractinc/base/redux/hooks';
import LandingScreen from '@/screens/LandingScreen';
import AdminIndex from '@/screens/AdminIndex';

const RootIndex = () => {
    const auth = useAppSelector((state) => state.auth);

    if (auth.status) {
        return <AdminIndex />;
    }

    return <LandingScreen />;
};

export default RootIndex;
