export interface JwtPayload {
  sub: string;
}

export interface User {
  id: string;
  username: string;
  displayName: string;
}
