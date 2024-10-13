import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";

import "./style.scss";
import { SidebarTable } from "@/widgets";


export const Project = observer(() => {
    const { id = "" } = useParams();

    return (
        <div className="project-wrapper">
            <SidebarTable projectId={Number.parseInt(id)}/>
        </div>
    )
})