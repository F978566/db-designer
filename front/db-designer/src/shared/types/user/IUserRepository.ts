import { UserActivate } from "./activate";
import { ObtainToken, PostToken } from "./token";
import { User } from "./user";

export interface IUserRepository {
    login(data: PostToken): Promise<ObtainToken>;
    verifyAuth(): Promise<number>;
    loadData(): Promise<Omit<User, "refresh" | "access">>;
    register(user: User): Promise<User>;
    activate(activateData: UserActivate): Promise<UserActivate>;
    delete(password: string): Promise<string>;
}