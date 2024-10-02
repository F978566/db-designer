import { AxiosPromise } from "axios";
import { injectable, container } from "tsyringe";

import { axiosInstance } from "./../base";
import { Project } from "@/shared/types";


export interface IProjectService {
    fetchProjects(): AxiosPromise<Project[]>;
}

@injectable()
export class ProjectService {
    async fetchAll(): AxiosPromise<Project[]> {
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

    async create(project: Project): AxiosPromise<Project> {
        const res = await axiosInstance.post("projects/", 
            project,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `JWT ${localStorage.getItem("accessToken")}`,
                }
            }
        )
    
        return res;
    }

    async getProject(id: number): AxiosPromise<Project> {
        const res = await axiosInstance.get(`/projects/${id}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `JWT ${localStorage.getItem("accessToken")}`,
                }
            }
        );
    
        return res;
    }

    async delete(id: number) {
        await axiosInstance.delete(`/projeects/${id}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `JWT ${localStorage.getItem("accessToken")}`,
                }
            }
        )
    }
}

container.register(ProjectService, { useClass: ProjectService });