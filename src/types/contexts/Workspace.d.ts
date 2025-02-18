type WorkspaceContextType = {
    organization?: Organization;
    projects?: Project[];
    isViewingOrg: boolean;
    isOrganizationPending: boolean;
    workspaceId?: string;
    organizationSocket: Channel | null;
    refetchOrganization: () => void;
    refetchProjects: () => void;
    organizationErrorMsg?: string;
    project?: Project;
    isViewingProject: boolean;
    workspaceProjectId?: string;
    projectSocket: Channel | null;
    refetchProject: () => void;
    projectErrorMsg?: string;
};

type WorkspaceProps = {
    children?: ReactNode;
};
