import { Project as ProjectType } from "@/shared/types";
import "./style.scss";


export const ProjectCard = ({project}: {project: ProjectType}) => {
    return (
        <div className="project-card-wrapper">
            <p>{project.name}</p>
        </div>
    )
}