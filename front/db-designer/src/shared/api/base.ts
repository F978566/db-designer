import axios, { AxiosInstance  } from "axios";
import { InjectionToken, container } from "tsyringe";


export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL as string,
}
)

export const AxiosInstanceToken: InjectionToken<AxiosInstance> = "AxiosInstance";
container.register<AxiosInstance>(AxiosInstanceToken, { useValue: axiosInstance })