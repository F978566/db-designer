import { ProjectsList, AdditionalActions } from "@/features";
import { projectModel } from "@/entities";
import "./style.scss";
import { useEffect } from "react";
import { dataTypeModel } from "@/entities/datatype";


export const Projects = () => {
    useEffect(() => {
        dataTypeModel.getAll();
    }, [])
    
    return (
        <div className="project-page-wrapper">
            <ProjectsList projectModel={projectModel} />
            <AdditionalActions />
        </div>
    )
}