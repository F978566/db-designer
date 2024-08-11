import { AxiosPromise } from "axios";
import { axiosInstance } from "../base";
import { ObtainToken, PostToken, User } from "@/shared/types";
import axios from "axios";


export async function login(data: PostToken): AxiosPromise<ObtainToken> {
    return await axiosInstance.post('/auth/jwt/create', data);;
}

export async function verifyAuthentication() {
    try {
        const res = await axiosInstance.post(
            '/auth/jwt/verify',
            {
                "token": `${localStorage.getItem("accessToken")}`
            },
            {
                headers: {
                    'Content-Type': 'application/json',
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

export async function loadUserData(): AxiosPromise<Omit<User, "refresh" | "access">> {
    const res = await axiosInstance.get('/auth/users/me/', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `JWT ${localStorage.getItem("accessToken")}`
        }
    });

    return res;
}