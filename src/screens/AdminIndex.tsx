import { useAppSelector } from '@intractinc/base/redux/hooks';

const AdminIndex = () => {
    const user = useAppSelector((state) => state.user);

    return (
        <>
            <div>{user.name}</div>test
        </>
    );
};

export default AdminIndex;
