import { makeAutoObservable, runInAction } from "mobx";

import { Project } from "@/shared/types";
import { fetchProjects } from "@/shared/api";


class Projects {
    projects: Project[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    getProjects() {
        runInAction(async () => {
            try {
                const res = await fetchProjects();
                this.setProjects(res.data);
            } catch (err) {
                console.log(err);
            }
        })
    }

    setProjects(projects: Project[]) {
        this.projects = projects;
    }
}


export const project = new Projects();