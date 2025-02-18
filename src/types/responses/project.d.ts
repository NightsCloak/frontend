type GetProjectsResponse = {
    data: Project[];
} & Pagination;

type UpdateProjectAvatarResponse =
    | Project
    | {
          message: string;
          errors: {
              image: string[];
          };
      };
