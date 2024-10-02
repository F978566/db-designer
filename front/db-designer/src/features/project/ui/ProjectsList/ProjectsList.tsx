import { observer } from "mobx-react-lite";
import { useEffect } from "react";

import { ProjectCard, ProjectModel } from "@/entities";
import "./style.scss";


export const ProjectsList =  observer(({ projectModel }: { projectModel: ProjectModel }) => {
    useEffect(() => {
        projectModel.getAll();
    }, [projectModel])

    return (
        <div className="projects-list-wrapper">
            <div className="project-list-container">
                {
                    projectModel.projects.map(project => {
                        return (
                            <ProjectCard key={project.id} project={project}/>
                        )
                    })
                }
            </div>
        </div>
    )
})