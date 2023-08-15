export interface CreateUserNameOutput {
  error: any;
  loading: boolean;
  data: {
    createUserName: {
      success: boolean;
      error: string;
    };
  };
}

export interface CreateUserNameInput {
  username: String;
}
