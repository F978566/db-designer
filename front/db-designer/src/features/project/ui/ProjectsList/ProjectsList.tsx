import { observer } from "mobx-react-lite";
import { useEffect } from "react";

import { ProjectCard, Projects, } from "@/entities";
import "./style.scss";


export const ProjectsList =  observer(({ projects }: { projects: Projects }) => {
    useEffect(() => {
        projects.getAll();
    }, [projects])

    return (
        <div className="projects-list-wrapper">
            <div className="project-list-container">
                {
                    projects.projects.map(project => {
                        return (
                            <ProjectCard key={project.id} project={project}/>
                        )
                    })
                }
            </div>
        </div>
    )
})