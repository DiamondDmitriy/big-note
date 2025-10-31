import type RegistrationRequest from '@/pages/auth/api/registration.request.ts'
import type { UserResponse } from '@/pages/auth/api/user.response.ts'
import type { AxiosResponse } from 'axios'
import type { LoginRequest } from '@/pages/auth/api/login.request.ts'
import RestClient from '@/shared/api/client/rest.client.ts'

export class AuthApi extends RestClient {
  signIn(data: LoginRequest): Promise<AxiosResponse<UserResponse>> {
    return this.http.request({
      method: 'POST',
      url: `/api/v1/auth/sign-in`,
      data: data,
    })
  }

  signUp(registrationRequest: RegistrationRequest): Promise<AxiosResponse<UserResponse>> {
    return this.http.request({
      method: 'POST',
      url: `/api/v1/auth/sign-up`,
      data: registrationRequest,
    })
  }

  signCheck(): Promise<AxiosResponse<UserResponse>> {
    return this.http.request({
      method: 'GET',
      url: `/api/v1/auth/sign-check`,
    })
  }

  signOut() {
    return this.http.request({
      method: 'DELETE',
      url: `/api/v1/auth/sign-out`,
    })
  }
}
