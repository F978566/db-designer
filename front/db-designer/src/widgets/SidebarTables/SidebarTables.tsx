import { tableModel } from "@/entities/table";
import { CreateTableDialog } from "@/features";
import { TableList } from "@/features/tables/ui/TablesList/TableList";
import "./style.scss";


export const SidebarTable = ({ projectId }: { projectId: number }) => {
    return (
        <div className="sidebar-wrapper">
            <TableList projectId={projectId} tableModel={tableModel}/>
            <CreateTableDialog tableModel={tableModel} projectId={projectId}/>
        </div>
    )
}