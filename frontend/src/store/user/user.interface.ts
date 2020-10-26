export interface IUserState {
  auth: boolean;
  passwords: PasswordsPaginatedDTO;
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
}

export interface UpdatePasswordDTO extends PasswordDTO {
  rowsPerPage: number;
  page: number;
}

export interface PaginationDTO {
  count: number;
  page: number;
}

export interface PasswordsPaginatedDTO {
  passwords: Array<PasswordDTO>;
  count: number;
}

export interface DeletePasswordDTO {
  id: number;
}

export interface EditUserDTO {
  oldPassword: string;
  password: string;
  key: string;
}
