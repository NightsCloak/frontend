import SidebarContext from '@/contexts/SidebarContext';
import { FC } from 'react';
import { useLocation } from 'react-router';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { toggleDrawer } from '@/redux/reducers/appSlice';

type SidebarProviderProps = {
    children: ReactNode;
};

const SidebarProvider: FC<SidebarProviderProps> = ({ children }) => {
    const location = useLocation();
    const path = location.pathname.split('/')[1];
    const sidebarOpen = useAppSelector((state) => state.app.drawer);
    const dispatch = useAppDispatch();
    const setOpen = () => dispatch(toggleDrawer());
    return <SidebarContext value={{ open: sidebarOpen, setOpen, path }}>{children}</SidebarContext>;
};

export default SidebarProvider;
