export interface ISignupUserRequest {
  name: string;
  email: string;
  password: string;
}


export interface ISignupUserResponse {
  id: string;
  name: string;
  email: string;
}
