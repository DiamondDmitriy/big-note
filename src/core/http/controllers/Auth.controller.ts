import container from '@/di.ts'
import RestController from '@/core/http/RestController.ts'
import type RegistrationRequest from '@/core/http/request/auth/RegistrationRequest.ts'
import type { UserResponse } from '@/core/http/response/auth/UserResponse.ts'
import type { AxiosResponse } from 'axios'
import type { LoginRequest } from '@/core/http/request/auth/LoginRequest.ts'

export const AUTH_SERVICE_ID = Symbol('AUTH_SERVICE_ID')

export class AuthController extends RestController {
  signIn(data: LoginRequest): Promise<AxiosResponse<UserResponse>> {
    return this.http.request({
      method: 'POST',
      url: `/auth/sign-in`,
      data: data,
    })
  }

  signUp(registrationRequest: RegistrationRequest): Promise<AxiosResponse<UserResponse>> {
    return this.http.request({
      method: 'POST',
      url: `/auth/sign-up`,
      data: registrationRequest,
    })
  }

  signCheck(): Promise<AxiosResponse<UserResponse>> {
    return this.http.request({
      method: 'GET',
      url: `/auth/sign-check`,
    })
  }

  signOut(){
    return this.http.request({
      method: 'DELETE',
      url: `/auth/sign-out`,
    })
  }
}

container.bind<AuthController>(AUTH_SERVICE_ID).to(AuthController)
