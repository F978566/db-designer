import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

import { Project as ProjectType } from "@/shared/types";
import { CircleButton, DeleteSvg } from "@/shared/ui";
import { ProjectModel } from "@/entities";
import "./style.scss";


export const ProjectCard = observer(({ project, projectModel }: { project: ProjectType, projectModel: ProjectModel }) => {
    return (
        <Link to={`/project/${project.id}`} className="project-card-wrapper">
            <div className="project-card">
                <p>{project.name}</p>
                <CircleButton onClick={() => {
                    projectModel.delete(project.id);
                    window.location.reload();
                }}>
                    <DeleteSvg />
                </CircleButton>
            </div>
        </Link>
    )
})