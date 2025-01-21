import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

import { SidebarTable } from "@/widgets";
import { dataTypeModel } from "@/entities/datatype";
import "./style.scss";


export const Project = observer(() => {
    const { id = "" } = useParams();

    useEffect(() => {
        dataTypeModel.getAll();
    }, [id])
    

    return (
        <div className="project-wrapper">
            <SidebarTable projectId={Number.parseInt(id)}/>
        </div>
    )
})