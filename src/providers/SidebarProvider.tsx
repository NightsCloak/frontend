import SidebarContext from '@/contexts/SidebarContext';
import { FC } from 'react';
import { useLocation } from 'react-router';

type SidebarProviderProps = {
    children: ReactNode;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SidebarProvider: FC<SidebarProviderProps> = ({ children, open, setOpen }) => {
    const location = useLocation();
    const path = location.pathname.split('/')[1];

    return <SidebarContext value={{ open, setOpen, path }}>{children}</SidebarContext>;
};

export default SidebarProvider;
