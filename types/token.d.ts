export interface SessionToken {
  accessToken: string;
  expiresAt: number;
}

export interface UserData {
  id: string; // db uuid
  driverId: string; // ms-driver id
  fistname: string;
  surname: string;
  nickname: string;
  exp: number; // in seconds
  iat: number; // in seconds
  redirect?: { destination: string };
}
