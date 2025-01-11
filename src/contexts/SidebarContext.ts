import { createContext, use } from 'react';

type SidebarContextProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    path: string;
};

export const SidebarContext = createContext<SidebarContextProps>({ open: false, setOpen: () => undefined, path: '' });

const useSidebar = () => {
    return { ...use(SidebarContext) };
};

export default SidebarContext;
export { useSidebar };
