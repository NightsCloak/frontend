type GetOrganizationsResponse = {
    data: Organization[];
} & Pagination;

type GetOrganizationProjectsResponse = {
    data: Project[];
} & Pagination;

type UpdateOrganizationAvatarResponse = Organization & {
    message?: string;
    errors?: {
        image?: string[];
    };
};
