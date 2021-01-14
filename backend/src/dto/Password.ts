
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

export interface SharedPasswordsDTO extends PasswordResponseDTO {
  key: string;
}