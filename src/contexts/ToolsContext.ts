import { createContext, use } from 'react';

const initialTools = {
    tools: null,
    updateTools: () => undefined,
    breadcrumbs: null,
    updateBreadcrumbs: () => undefined,
    updateTabTitle: () => undefined,
    tabTitle: null,
    playChime: () => undefined,
    modal: null,
    updateModal: () => undefined,
};

export const ToolsContext = createContext<ToolsContextType>(initialTools);

const useTools = () => {
    return use(ToolsContext);
};

export default ToolsContext;

export { useTools };
