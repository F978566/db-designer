import { injectable, inject, container } from "tsyringe";

import { ProjectService } from "../services";
import { Project, IProjectRepository } from "@/shared/types";


@injectable()
export class ProjectRepository implements IProjectRepository {
    constructor(@inject(ProjectService) private projectService: ProjectService) {}
    
    async getAll() {
        return (await this.projectService.fetchProjects()).data;
    }
    
    async create(data: Project) {}
    
    async update(id: number, data: Project) {}
    
    async delete(id: number) {}
    
}

container.register("IProjectRepository", { useClass: ProjectRepository });