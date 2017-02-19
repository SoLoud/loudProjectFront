import { User } from './User';

export class LoginResponse {
  "access_token": string = null;
  "token_type": string = null;
  "expires_in": number = null;
  "User": User = null;
  ".issued": Date = null;
  ".expires": Date = null;

  //Supress index signature 'any' type error
  [key: string]: string | Date | number | User;
}
