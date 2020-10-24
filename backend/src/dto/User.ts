export interface RegisterUserDTO {
  login: string;
  password: string;
  encryption: 'sha512' | 'hmac';
}
