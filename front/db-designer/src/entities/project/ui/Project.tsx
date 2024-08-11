import { Project as ProjectType } from "@/shared/types";


export const ProjectCard = (project: ProjectType) => {
    return (
        <p>{project.name}</p>
    )
}