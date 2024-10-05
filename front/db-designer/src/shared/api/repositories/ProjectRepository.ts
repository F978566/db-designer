import { injectable, inject, container } from "tsyringe";

import { Project, IProjectRepository } from "@/shared/types";
import type { AxiosInstance } from "axios";
import { AxiosInstanceToken } from "../base";


@injectable()
export class ProjectRepository implements IProjectRepository {
    constructor (@inject(AxiosInstanceToken) private axiosInstance: AxiosInstance) {}
    
    async getAll() {
        const res = await this.axiosInstance.get<Project[]>("projects/", 
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `JWT ${localStorage.getItem("accessToken")}`,
                }
            }
        );
        return res.data;
    }
    
    async create(data: Project) {
        const res = await this.axiosInstance.post("projects/", 
            data,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `JWT ${localStorage.getItem("accessToken")}`,
                }
            }
        )
    
        return res.data;
    }
    
    async update(id: number, data: Project) {}
    
    async delete(id: number) {
        await this.axiosInstance.delete(`/projects/${id}/`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `JWT ${localStorage.getItem("accessToken")}`,
                }
            }
        );
    }
    
}

container.register("IProjectRepository", { useClass: ProjectRepository });