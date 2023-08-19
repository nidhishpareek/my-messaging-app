export interface CreateUserNameOutput {
  data?: {
    createUserName: {
      success?: boolean;
      error?: string;
    };
  };
}

export interface CreateUserNameInput {
  username: String;
}
