import { AxiosPromise } from "axios";
import { injectable, container } from "tsyringe";

import { axiosInstance } from "./../base";
import { Project } from "@/shared/types";


export interface IProjectService {
    fetchProjects(): AxiosPromise<Project[]>;
}

@injectable()
export class ProjectService {
    async fetchProjects(): AxiosPromise<Project[]> {
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
}

container.register(ProjectService, { useClass: ProjectService });