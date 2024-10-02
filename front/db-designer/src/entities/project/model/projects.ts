import { makeAutoObservable, runInAction } from "mobx";
import { container, injectable, inject } from "tsyringe";

import type { IBaseRepository, Project } from "@/shared/types";
import { ProjectStatus } from "./tpyes";


@injectable()
export class ProjectModel {
    projects: Project[] = [];
    status: ProjectStatus = ProjectStatus.NOTHING;
    errors: string[] = [];
    private projectRepository: IBaseRepository<Project>;

    constructor(@inject("IProjectRepository") projectRepository: IBaseRepository<Project>) {
        this.projectRepository = projectRepository;
        makeAutoObservable(this);
    }

    async getAll() {
        runInAction(() => {
            this.setStatus(ProjectStatus.LOADING);
        })
        try {
            const res = await this.projectRepository.getAll();
            runInAction(() => {
                this.setProjects(res);
                this.setStatus(ProjectStatus.FULFILLED);
            })
            
        } catch (err) {
            runInAction(() => {
                this.setStatus(ProjectStatus.ERROR);
            })
        }
    }

    async create(data: Project) {
        runInAction(() => {
            this.setStatus(ProjectStatus.LOADING);
        })
        try {
            await this.projectRepository.create(data);
            runInAction(() => {
                this.setStatus(ProjectStatus.FULFILLED);
            })
            
        } catch (err) {
            runInAction(() => {
                this.setStatus(ProjectStatus.ERROR);
                this.setErrors(["Error during creating the project"]);
            })
        }
    }

    async delete(id: number) {
        runInAction(() => {
            this.setStatus(ProjectStatus.LOADING);
        })
        try {
            await this.projectRepository.delete(id);
            runInAction(() => {
                this.setStatus(ProjectStatus.FULFILLED);
            })
            
        } catch (err) {
            runInAction(() => {
                this.setStatus(ProjectStatus.ERROR);
                this.setErrors(["Error during creating the project"]);
            })
        }
    }

    setProjects(projects: Project[]) {
        this.projects = projects;
    }

    setStatus(newStatus: ProjectStatus) {
        this.status = newStatus;
    }

    setErrors(errors: string[]) {
        this.errors = errors;
    }
}

export const projectModel = container.resolve(ProjectModel);