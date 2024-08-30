import { AxiosPromise } from "axios";
import { axiosInstance } from "../base";
import { ObtainToken, PostToken, User, UserActivate } from "@/shared/types";
import axios from "axios";

export class UserService {
    async login(data: PostToken): AxiosPromise<ObtainToken> {
        return await axiosInstance.post("/auth/jwt/create", data);
    }
    
    async verifyAuthentication(): Promise<number> {
        try {
            const res = await axiosInstance.post(
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
            if (axios.isAxiosError(err)) {
                if (err.response?.status === 401) {
                    return err?.response?.status;
                }
            }
    
            throw err;
        }
    }
    
    async loadUserData(): AxiosPromise<Omit<User, "refresh" | "access">> {
        const res = await axiosInstance.get("/auth/users/me/", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `JWT ${localStorage.getItem("accessToken")}`
            }
        });
    
        return res;
    }
    
    async register(user: User): AxiosPromise<User> {
        return await axiosInstance.post("/auth/users/",
            {
                ...user
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
    }
    
    async activate(activateData: UserActivate): AxiosPromise<UserActivate> {
        const res = await axiosInstance.post("/auth/users/activation/",
            {
                ...activateData
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
    
        return res;
    }

    async delete(password: string): AxiosPromise<string> {
        const res = await axiosInstance.delete("/auth/users/me/",
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

        return res;
    }
}