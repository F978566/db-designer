import { useState } from "react";

import { TableType } from "@/shared/types";
import { Button, DialogWindow } from "@/shared/ui";
import { EnrichedTableCard } from "../EnrichedTableCard/EnrichedTableCard";
import { EditTableActions } from "./EditTableActions";
import { useTableListContext } from "../../util/useTableListContext";
import "./style.scss";


export const EditTableDialog = ({ table }: { table: TableType }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { columnModel } = useTableListContext()

    const defaultColumn = {
        table: table.id,
        name: "DefaultName",
        data_type: 1,
        data_type_name: "INT",
        is_nullable: false,
        is_relationship: false,
        is_primary_key: false
    }

    return (
        <div className="eidt-table-card">
            <Button onClick={() => setIsOpen(true)}>Edit</Button>
            <DialogWindow isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <div className="edit-table-content">
                    <EnrichedTableCard table={table}>
                        <EnrichedTableCard.ColumnInputList />
                            <button
                                onClick={() => columnModel.add(defaultColumn)}
                            >
                                Add
                            </button>
                    </EnrichedTableCard>
                    <EditTableActions table={table} />
                </div>
            </DialogWindow>
        </div>
    )
}