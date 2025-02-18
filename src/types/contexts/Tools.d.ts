type ToolsContextType = {
    tools: ReactNode | null;
    updateTools: (updatedTools: ReactNode) => void;
    breadcrumbs?: ReactNode;
    updateBreadcrumbs: (breadcrumbs: BreadcrumbItemProps[]) => void;
    updateTabTitle: (title: string | null) => void;
    tabTitle: string | null;
    playChime: () => void;
    modal?: ReactNode | null;
    updateModal: (modal: ReactNode | null) => void;
};

interface ToolsProps {
    children?: ReactNode;
}
