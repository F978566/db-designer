import { TableType } from "@/shared/types";
import { CircleButton, DeleteSvg, SaveSvg } from "@/shared/ui";
import { useTableListContext } from "../../util/useTableListContext";
import "./style.scss"

export const EditTableActions = ({ table }: { table: TableType }) => {
    const { tableModel, columnModel } = useTableListContext()

    return (
        <div className="edit-table-actions">
            <CircleButton>
                <DeleteSvg onClick={() => {
                    tableModel.delete(table.id);
                    window.location.reload();
                }} />
            </CircleButton>
            <CircleButton>
                <SaveSvg onClick={() => {
                    columnModel.patchColumnsList();
                    columnModel.createColumnList();
                }} />
            </CircleButton>
        </div>
    )
}