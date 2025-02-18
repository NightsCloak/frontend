type WaitListSignUpRequest = {
    first: string;
    last: string;
    email: string;
};

type UpdateUserNameRequest = {
    first: string;
    last: string;
};

type UpdateUserAvatarRequest = {
    avatar: FormData;
};

type UpdateUserEmailRequest = {
    current_password: string;
    email: string;
};

type UpdateUserPasswordRequest = {
    current_password: string;
    password: string;
    password_confirmation: string;
};

type SetUserPasswordRequest = {
    password: string;
    password_confirmation: string;
};

type DeleteUserAccountRequest = {
    current_password?: string;
};

type AdminGetUsersRequest = {
    options?: QueryFilterOptions;
};

type AdminGetUserRequest = {
    userId: string;
};

type AdminUpdateUserRequest = {
    userId: string;
    is_enabled: boolean;
    is_admin: boolean;
    is_verified: boolean;
};

type AdminArchiveUserRequest = {
    userId: string;
};

type AdminPurgeUserRequest = {
    userId: string;
};

type AdminRestoreUserRequest = {
    userId: string;
};
