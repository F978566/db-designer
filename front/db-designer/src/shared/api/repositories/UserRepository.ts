import { inject, injectable } from "tsyringe";

import { UserService } from "../services/UserService";
import {
    IUserRepository,
    ObtainToken,
    PostToken,
    User,
    UserActivate,
} from "@/shared/types";


@injectable()
export class UserRepository implements IUserRepository {
    constructor (@inject(UserService) private userService: UserService) {}

    async login(data: PostToken): Promise<ObtainToken>  {
        return (await this.userService.login(data)).data;
    }

    async verifyAuth(): Promise<number> {
        return await this.userService.verifyAuthentication();
    }

    async loadData(): Promise<Omit<User, "refresh" | "access">> {
        return (await this.userService.loadUserData()).data;
    }

    async register(user: User): Promise<User> {
        return (await this.userService.register(user)).data;
    }

    async activate(activateData: UserActivate): Promise<UserActivate> {
        return (await this.userService.activate(activateData)).data;
    }

    async delete(password: string): Promise<string> {
        return (await this.userService.delete(password)).data;
    }

    async resetPassword(email: string): Promise<{email: string}> {
        return (await this.userService.resetPassword(email)).data;
    }

    async resetPasswordConfirm(data: { uid: string; token: string; new_password: string; }): Promise<{ uid: string; token: string; new_password: string; }> {
        return (await this.userService.resetPasswordConfirm(data)).data;
    }
}