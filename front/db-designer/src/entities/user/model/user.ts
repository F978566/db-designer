import { makeAutoObservable, runInAction } from "mobx";
import { container, inject, injectable } from "tsyringe";

import type {
    User as UserType,
    UserActivate,
    PostToken,
    IUserRepository,
    ObtainToken,
    ResetPassword,
} from "@/shared/types";
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
    userStatus: UserStatus = UserStatus.NOTHING;
    isAuth: boolean = false;
    errors: string[] = [];

    constructor(@inject("IUserRepository") private userRepository: IUserRepository) {
        makeAutoObservable(this);
    }

    async userLogin(userData: PostToken) {
        runInAction(() => {
            this.setUserStatus(UserStatus.LOADING);
        })
        try {
            const res: ObtainToken = await this.userRepository.login(userData);
            runInAction(() => {
                localStorage.setItem("accessToken", res.access);
                localStorage.setItem("refreshToken", res.refresh);
                this.loadUser();
                this.setIsAuth(true);
                this.setUserStatus(UserStatus.FULFILLED)
            })
        } catch (err: any) {
            runInAction(() => {
                this.setErrors([err?.response?.data.detail]);
                this.setUserStatus(UserStatus.ERROR);
            })
        }
    }

    async checkAuth() {
        runInAction(() => {
            this.setUserStatus(UserStatus.LOADING);
        })
        try {
            const res: number = await this.userRepository.verifyAuth();

            switch (res) {
                case 200:
                    await this.loadUser();
                    runInAction(() => {
                        this.setIsAuth(true);
                    })
                    break;
                case 401:
                    runInAction(() => {
                        this.setIsAuth(false);
                        localStorage.removeItem("accessToken");
                        localStorage.removeItem("refreshToken");
                    })
                    break;
                default:
                    throw new Error("Unexpected status code");
            }
            runInAction(() => {
                this.setUserStatus(UserStatus.FULFILLED);
            })
        } catch (err: any) {
            runInAction(() => {
                this.setErrors(err?.response?.data.detail);
                this.setUserStatus(UserStatus.ERROR);
            })
        }
    }

    async loadUser() {
        const res = await this.userRepository.loadData();
        runInAction(() => {
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

    async registerUser(newUser: UserType) {
        runInAction(() => {
            this.setUserStatus(UserStatus.LOADING);
        })
        try {
            await this.userRepository.register(newUser);
            runInAction(() =>
                this.setUserStatus(UserStatus.FULFILLED)
            );
        } catch (err: any) {
            runInAction(() => {
                let errors: string[] = [];
                const r = err?.response?.data;

                for (const el in r) {
                    errors = errors.concat(r[el]);
                }
                this.setErrors(errors);
                this.setUserStatus(UserStatus.ERROR);
            })
        }
    }

    async userActivate(data: UserActivate) {
        runInAction(() => {
            this.setUserStatus(UserStatus.LOADING);
        })
        try {
            await this.userRepository.activate(data);
            runInAction(() => {
                this.setUserStatus(UserStatus.FULFILLED);
            })
        } catch (err) {
            runInAction(() => {
                this.setUserStatus(UserStatus.ERROR);
            })
        }
    }

    async delete(password: string) {
        runInAction(() => {
            this.setUserStatus(UserStatus.LOADING);
        })
        try {
            await this.userRepository.delete(password);
            runInAction(() => {
                this.logout();
                this.setUserStatus(UserStatus.FULFILLED);
            })
        } catch (err: any) {
            runInAction(() => {
                this.setErrors(["Error deleting"]);
                this.setUserStatus(UserStatus.ERROR);
            })
        }
    }

    async resetPassword() {
        runInAction(() => {
            this.setUserStatus(UserStatus.LOADING);
        })
        try {
            await this.userRepository.resetPassword(this.user.email);
            runInAction(() => {
                this.setUserStatus(UserStatus.FULFILLED);
            })
        } catch (err: any) {
            runInAction(() => {
                this.setErrors(["Error reset password"]);
                this.setUserStatus(UserStatus.ERROR);
            })
        }
    }

    async resetPasswordConfirm(data: ResetPassword) {
        runInAction(() => {
            this.setUserStatus(UserStatus.LOADING);
        })
        try {
            await this.userRepository.resetPasswordConfirm(data);
            runInAction(() => {
                this.setUserStatus(UserStatus.FULFILLED);
            })
        } catch (err: any) {
            runInAction(() => {
                this.setErrors(["Error reset password"]);
                this.setUserStatus(UserStatus.ERROR);
            })
        }
    }

    setIsAuth(status: boolean) {
        this.isAuth = status;
    }

    setUserStatus(status: UserStatus) {
        this.userStatus = status;
    }

    setUser(userData: UserType) {
        this.user = userData;
    }

    setErrors(errors: string[]) {
        this.errors = errors;
    }
}

export const user = container.resolve(User);