export interface RegisterUserDTO {
  login: string;
  password: string;
  encryption: 'sha512' | 'hmac';
}

export interface CreatePasswordDTO {
  webAddress: string;
  description: string;
  login: string;
  password: string;
}

export interface UserCredentials {
  login: string;
  id: number;
}
