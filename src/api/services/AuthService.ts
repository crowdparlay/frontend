import http from "../common";
import type SignInResult from "@/api/types/SignInResult";
import type {AxiosError, AxiosResponse} from "axios";
import type SignUpResult from "@/api/types/SignUpResult";
import type SignInRequest from "@/api/types/SignInRequest";
import type SignUpRequest from "@/api/types/SignUpRequest";

export default class AuthService {
  static async signUp(request: SignUpRequest): Promise<SignUpResult> {
    const handleSuccess = () => {
      return {success: true}
    }

    const handleError = () => {
      return {success: false}
    }

    return await http.post('/api/users/register', request).then(handleSuccess, handleError);
  }

  static async signIn({username, password}: SignInRequest): Promise<SignInResult> {
    const body = {
      scope: "offline_access",
      grant_type: "password",
      username,
      password
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
      return {
        success: false,
        userExists: error.request.status === 403
      }
    }

    return await http.post('/connect/token', body, {
      headers: {"Content-Type": "application/x-www-form-urlencoded"}
    }).then(handleSuccess, handleError)
  }
}