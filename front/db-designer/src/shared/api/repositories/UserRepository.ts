import { inject, injectable } from "tsyringe";
import type { AxiosInstance } from "axios";
import { isAxiosError } from "axios";

import { AxiosInstanceToken } from "../base";
import {
    IUserRepository,
    ObtainToken,
    PostToken,
    User,
    UserActivate,
} from "@/shared/types";


@injectable()
export class UserRepository implements IUserRepository {
    constructor (@inject(AxiosInstanceToken) private axiosInstance: AxiosInstance) {}

    async login(data: PostToken): Promise<ObtainToken>  {
        return (await this.axiosInstance.post("/auth/jwt/create/", data)).data;
    }

    async verifyAuth(): Promise<number> {
        try {
            const res = await this.axiosInstance.post(
                "/auth/jwt/verify",
                {
                    "token": `${localStorage.getItem("accessToken")}`
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `JWT ${localStorage.getItem("accessToken")}`
                    }
                }
            );
    
            return res.request.status;
        } catch (err) {
            if (isAxiosError(err)) {
                if (err.response?.status === 401) {
                    return err?.response?.status;
                }
            }
    
            throw err;
        }
    }

    async loadData(): Promise<Omit<User, "refresh" | "access">> {
        const res = await this.axiosInstance.get("/auth/users/me/", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `JWT ${localStorage.getItem("accessToken")}`
            }
        });
    
        return res.data;
    }

    async register(user: User): Promise<User> {
        return (await this.axiosInstance.post("/auth/users/",
            {
                ...user
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )).data;
    }

    async activate(activateData: UserActivate): Promise<UserActivate> {
        const res = await this.axiosInstance.post("/auth/users/activation/",
            {
                ...activateData
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
    
        return res.data;
    }

    async delete(password: string): Promise<string> {
        const res = await this.axiosInstance.delete("/auth/users/me/",
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `JWT ${localStorage.getItem("accessToken")}`
                },
                data: {
                    "current_password": password
                }
            }
        )

        return res.data;
    }

    async resetPassword(email: string): Promise<{email: string}> {
        const res = await this.axiosInstance.post("/auth/users/reset_password/",
            {
                email: email
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `JWT ${localStorage.getItem("accessToken")}`
                }
            }
        );
        
        return res.data;
    }

    async resetPasswordConfirm(data: { uid: string; token: string; new_password: string; }): Promise<{ uid: string; token: string; new_password: string; }> {
        const res = await this.axiosInstance.post("/auth/users/reset_password_confirm/",
            data,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `JWT ${localStorage.getItem("accessToken")}`,
                }
            }
        );
        
        return res.data;
    }
}