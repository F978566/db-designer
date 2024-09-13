import { makeAutoObservable, runInAction, action } from "mobx";
import { container, inject, injectable } from "tsyringe";

import type { User as UserType, UserActivate, PostToken, IUserRepository, ObtainToken } from "@/shared/types";
import { UserStatus } from "./types";


@injectable()
export class User {
    user: UserType = {
        id: undefined,
        first_name: "",
        last_name: "",
        email: "",
        access: localStorage.getItem("accessToken"),
        refresh: localStorage.getItem("refreshToken"),
    };
    status: UserStatus = UserStatus.NOTHING;
    isAuth: boolean = false;
    errors: string[] = [];

    constructor(@inject("IUserRepository") private userRepository: IUserRepository) {
        makeAutoObservable(this);
    }

    userLogin(userData: PostToken) {
        runInAction(async () => {
            try {
                this.setUserStatus(UserStatus.LOADING);
                const res: ObtainToken = await this.userRepository.login(userData);
                localStorage.setItem("accessToken", res.access);
                localStorage.setItem("refreshToken", res.refresh);
                this.loadUser();
                this.setIsAuth(true);
                this.setUserStatus(UserStatus.FULFILLED)
            } catch (err: any) {
                this.setErrors([err?.response?.data.detail]);
                this.setUserStatus(UserStatus.ERROR);
            }
        })
    }

    checkAuth() {
        runInAction(async () => {
            try {
                this.setUserStatus(UserStatus.LOADING);
                const res: number = await this.userRepository.verifyAuth();

                switch (res) {
                    case 200:
                        this.loadUser();
                        this.setIsAuth(true);
                        break;
                    case 401:
                        this.setIsAuth(false);
                        localStorage.removeItem("accessToken");
                        localStorage.removeItem("refreshToken");
                        break;
                    default:
                        throw new Error("Unexpected status code");
                }
                this.setUserStatus(UserStatus.FULFILLED);
            } catch (err: any) {
                this.setErrors(err?.response?.data.detail);
                this.setUserStatus(UserStatus.ERROR);
            }
        })
    }

    loadUser() {
        runInAction(async () => {
            const res = await this.userRepository.loadData();
            this.setUser({
                ...res,
                refresh: localStorage.getItem("refreshToken"),
                access: localStorage.getItem("accessToken"),
            })
        })
    }



    logout() {
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("accessToken");
        this.setIsAuth(false);
    }

    registerUser(newUser: UserType) {
        runInAction(async () => {
            try {
                this.setUserStatus(UserStatus.LOADING);
                await this.userRepository.register(newUser);
                this.setUserStatus(UserStatus.FULFILLED);
            } catch (err: any) {
                let errors: string[] = [];
                const r = err?.response?.data;

                for (const el in r) {
                    errors = errors.concat(r[el]);
                }
                this.setErrors(errors);
                this.setUserStatus(UserStatus.ERROR);
            }
        })
    }

    userActivate(data: UserActivate) {
        runInAction(async () => {
            try {
                this.setUserStatus(UserStatus.LOADING);
                this.userRepository.activate(data);
                this.setUserStatus(UserStatus.FULFILLED);
            } catch (err) {
                this.setUserStatus(UserStatus.ERROR);
            }
        })
    }

    delete(password: string) {
        runInAction(async () => {
            try {
                this.setUserStatus(UserStatus.LOADING);
                await this.userRepository.delete(password);
                this.logout();
                this.setUserStatus(UserStatus.FULFILLED);
            } catch (err: any) {
                this.setErrors(["Error deleting"]);
                this.setUserStatus(UserStatus.ERROR);
            }
        })
    }

    setIsAuth(status: boolean) {
        this.isAuth = status;
    }

    setUserStatus(status: UserStatus) {
        this.status = status;
    }

    setUser(userData: UserType) {
        this.user = userData;
    }

    setErrors(errors: string[]) {
        this.errors = errors;
    }
}

export const user = container.resolve(User);