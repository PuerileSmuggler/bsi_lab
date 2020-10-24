export interface IUserState {
  auth: boolean;
  passwords: Array<CreatePasswordPayload>;
}

export interface LoginUserPayload {
  login: string;
  password: string;
}
export interface CreatePasswordPayload {
  webAddress: string;
  description: string;
  login: string;
  password: string;
}
