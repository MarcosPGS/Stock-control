export interface IAuthRequest{
  email: string;
  password: string;
}

export interface IAuthResponse{
  id: string;
  name: string;
  email: string;
  token: string;
}

