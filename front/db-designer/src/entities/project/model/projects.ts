import { makeAutoObservable, runInAction } from "mobx";
import { container, injectable, inject } from "tsyringe";

import type { IBaseRepository, Project } from "@/shared/types";


@injectable()
export class Projects {
    projects: Project[] = [];
    private projectRepository: IBaseRepository<Project>;

    constructor(@inject("IProjectRepository") projectRepository: IBaseRepository<Project>) {
        this.projectRepository = projectRepository;
        makeAutoObservable(this);
    }

    getProjects() {
        runInAction(async () => {
            try {
                const res = await this.projectRepository.getAll();
                this.setProjects(res);
            } catch (err) {
                console.log(err);
            }
        })
    }

    setProjects(projects: Project[]) {
        this.projects = projects;
    }
}

export const project = container.resolve(Projects);