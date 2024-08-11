import { AxiosPromise } from "axios";

import { axiosInstance } from "./../base";
import { Project } from "@/shared/types";


export async function fetchProjects(): AxiosPromise<Project[]> {
    const res = await axiosInstance.get<Project[]>("projects/", 
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `JWT ${localStorage.getItem("accessToken")}`,
            }
        }
    );
    return res;
}