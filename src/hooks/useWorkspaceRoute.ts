import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

type WorkspaceRoute = {
    workspaceId?: string;
    workspaceProjectId?: string;
};

const useWorkspaceRoute = (): WorkspaceRoute => {
    const location = useLocation();
    const pathParts = useMemo(() => location.pathname.split('/').filter(Boolean), [location.pathname]);

    if (pathParts[0] === 'organizations') {
        return {
            workspaceId: pathParts[1],
            workspaceProjectId: pathParts[2] === 'projects' ? pathParts[3] : undefined,
        };
    }

    return {
        workspaceId: undefined,
        workspaceProjectId: undefined,
    };
};

export default useWorkspaceRoute;
