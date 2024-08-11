import { AxiosResponse } from "axios";
import { makeAutoObservable, runInAction } from "mobx";

import { ObtainToken } from "@/shared/types";
import { PostToken } from "@/shared/types";
import { User as UserType } from "@/shared/types";
import { login, verifyAuthentication, loadUserData } from "@/shared/api";


export class User {
    user: UserType = {
        id: undefined,
        first_name: '',
        last_name: '',
        email: '',
        access: localStorage.getItem("accessToken"),
        refresh: localStorage.getItem("refreshToken"),
    };
    isLoading = false;
    isAuth = false;

    constructor() {
        makeAutoObservable(this);
    }

    userLogin(userData: PostToken) {
        runInAction(async () => {
            try {
                this.setIsLoading(true);
                const res: AxiosResponse<ObtainToken> = await login(userData);
                localStorage.setItem("accessToken", res.data.access);
                localStorage.setItem("refreshToken", res.data.refresh);
                this.loadUser();
                this.setIsAuth(true);
            } catch (err) {
                console.log(err);
            } finally {
                this.setIsLoading(false);
            }
        })
    }

    checkAuth() {
        runInAction(async () => {
            try {
                this.setIsLoading(true);
                const res = await verifyAuthentication();

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
            } catch (err) {
                console.log(err);
            } finally {
                this.setIsLoading(false);
            }
        })
    }

    loadUser() {
        runInAction(async () => {
            const res = await loadUserData();
            this.setUser({
                ...res.data,
                refresh: localStorage.getItem("refreshToken"),
                access: localStorage.getItem("accessToken"),
            })
        })
    }

    setIsAuth(status: boolean) {
        this.isAuth = status;
    }

    setIsLoading(status: boolean) {
        this.isLoading = status;
    }

    setUser(userData: UserType) {
        this.user = userData;
    }
}


export const user = new User();