import http from "../common";
import type SignInResult from "../types/SignInResult";
import type {AxiosError, AxiosResponse} from "axios";

export default class AuthService {
  static async signIn(username: string, password: string): Promise<SignInResult> {
    const body = {
      scope: "offline_access",
      grant_type: "password",
      username: username,
      password: password
    }

    const handleSuccess = (response: AxiosResponse) => {
      return {
        success: true,
        userExists: true,
        accessToken: response.data["access_token"],
        refreshToken: response.data["refresh_token"]
      }
    }

    const handleError = (error: AxiosError) => {
      switch (error.request.status) {
        case 403:
          return {
            success: false,
            userExists: true
          }
        case 404:
          return {
            success: false,
            userExists: false
          }
        default:
          return {success: false}
      }
    }

    return await http.post('/connect/token', body).then(handleSuccess, handleError);
  }
}