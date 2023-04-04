export default interface SignInResult {
  success: boolean,
  userExists?: boolean,
  accessToken?: string,
  refreshToken?: string
}