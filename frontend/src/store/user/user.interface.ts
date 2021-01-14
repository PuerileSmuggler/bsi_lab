export interface IUserState {
  auth: boolean;
  passwords: PasswordsPaginatedDTO;
  sharedPasswords: PasswordsPaginatedDTO;
  sharingPasswords: PasswordsPaginatedDTO;
  errors: { [key: string]: string | undefined };
  password?: PasswordResponseDTO;
  ipBlocked: boolean;
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
  key: string;
}

export interface PasswordDTO extends CreatePasswordPayload {
  id: number;
  user?: string;
  shareId?: number;
}

export interface PaginationDTO {
  count: number;
  page: number;
}

export interface PasswordsPaginatedDTO {
  passwords: Array<PasswordDTO>;
  count: number;
  key?: string;
}

export interface DeletePasswordDTO {
  id: number;
}

export interface EditUserDTO {
  oldPassword: string;
  password: string;
  key: string;
  encryption: "sha512" | "hmac";
}

export interface LoginUserResponseDTO {
  access_token: string;
  key: string;
  ttl: number;
}

export interface PasswordResponseDTO {
  login: string;
  description: string;
  webAddress: string;
}

export interface SharePasswordDTO {
  passwordId: number;
  email: string;
  key: string;
}

export interface RemoveSharePasswordDTO {
  sharingId: number;
  owner: boolean;
}
