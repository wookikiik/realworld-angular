export interface User {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string;
}

export enum AuthType {
  LOGIN = 'login',
  REGISTER = 'register',
}
