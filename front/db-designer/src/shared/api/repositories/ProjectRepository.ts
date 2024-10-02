import { injectable, inject, container } from "tsyringe";

import { ProjectService } from "../services/ProjectService";
import { Project, IProjectRepository } from "@/shared/types";


@injectable()
export class ProjectRepository implements IProjectRepository {
    constructor(@inject(ProjectService) private projectService: ProjectService) {}
    
    async getAll() {
        return (await this.projectService.fetchAll()).data;
    }
    
    async create(data: Project) {
        return (await this.projectService.create(data)).data;
    }
    
    async update(id: number, data: Project) {}
    
    async delete(id: number) {
        await this.projectService.delete(id);
    }
    
}

container.register("IProjectRepository", { useClass: ProjectRepository });