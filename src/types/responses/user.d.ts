type WaitListSignUpResponse = {
  message: string;
  errors?: {
    first?: string[];
    last?: string[];
    email?: string[];
  };
};

type UpdateAvatarResponse = User & {
    message: string;
    errors?: {
        image: string[];
    };
};

type UpdateNameResponse = User & {
    message: string;
    errors?: {
        first?: string[];
        last?: string[];
    };
};

type UpdateEmailResponse = User & {
    message: string;
    errors?: {
        current_password?: string[];
        email?: string[];
    };
};

type UpdatePasswordResponse = User & {
    message: string;
    errors?: {
        current_password?: string[];
        password?: string[];
    };
};

type DeleteAccountResponse = {
    message: string;
    errors?: {
        current_password?: string[];
    };
};

type UserLoginsResponse = {
    data: UserLogin[];
} & Pagination;

type AdminGetUsersResponse = {
    data: User[];
} & Pagination;
