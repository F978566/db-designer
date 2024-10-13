import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";

import { tableModel } from "@/entities/table";
import { TableList } from "@/features/tables/ui/TablesList/TableList";
import "./style.scss";


export const Project = observer(() => {
    const { id = "" } = useParams();

    return (
        <div className="project-wrapper">
            <TableList projectId={Number.parseInt(id)} tableModel={tableModel}/>
        </div>
    )
})