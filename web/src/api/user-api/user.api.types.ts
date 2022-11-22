export interface RegisterDto {
  name: string;
  surname: string;
  password: string;
  email: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegiterResponse {
  message: string;
}
