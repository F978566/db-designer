import { ProjectsList, AdditionalActions } from "@/features";
import { project } from "@/entities";
import "./style.scss";


export const Projects = () => {
    return (
        <div className="project-page-wrapper">
            <ProjectsList projects={project} />
            <AdditionalActions />
        </div>
    )
}