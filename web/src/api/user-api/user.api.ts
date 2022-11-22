import { LoginDto, RegisterDto, RegiterResponse } from "./user.api.types";
import { Get, Post } from "api/config";
import { IUser } from "interfaces";

class UserApi {
  register(request: RegisterDto): Promise<RegiterResponse> {
    return Post(`user/register`, request);
  }

  login(request: LoginDto): Promise<IUser> {
    return Post(`user/login`, request);
  }

  logout() {
    return Post(`user/logout`);
  }

  confirm() {
    return Get(`user/confirm,`);
  }
}

export const userApi = new UserApi();
