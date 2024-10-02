import { Project as ProjectType } from "@/shared/types";
import "./style.scss";
import { DeleteSvg, LiButton } from "@/shared/ui";


export const ProjectCard = ({project}: {project: ProjectType}) => {
    return (
        <div className="project-card-wrapper">
            <p>{project.name}</p>
            <LiButton to="#">
                <DeleteSvg />
            </LiButton>
        </div>
    )
}