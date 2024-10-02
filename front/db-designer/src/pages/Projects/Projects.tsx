import { ProjectsList, AdditionalActions } from "@/features";
import { projectModel } from "@/entities";
import "./style.scss";


export const Projects = () => {
    return (
        <div className="project-page-wrapper">
            <ProjectsList projectModel={projectModel} />
            <AdditionalActions />
        </div>
    )
}