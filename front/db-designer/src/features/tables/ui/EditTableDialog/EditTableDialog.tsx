import { useState } from "react";

import { TableType } from "@/shared/types";
import { Button, CircleButton, DeleteSvg, DialogWindow } from "@/shared/ui";
import { columnModel } from "@/entities/column/model/column";
import { EnrichedTableCard } from "../EnrichedTableCard/EnrichedTableCard";
import { TableModel } from "@/entities";
import "./style.scss";


export const EditTableDialog = ({ table, tableModel }: { table: TableType, tableModel: TableModel }) => {
    const [isOpen, setIsOpen] = useState(false);


    return (
        <div className="eidt-table-card">
            <Button onClick={() => setIsOpen(true)}>Edit</Button>
            <DialogWindow isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <div className="edit-table-content">
                    <EnrichedTableCard table={table} columnModel={columnModel}>
                        <EnrichedTableCard.ColumnInputList />
                    </EnrichedTableCard>
                    <CircleButton>
                        <DeleteSvg onClick={() => {
                            tableModel.delete(table.id);
                            window.location.reload();
                        }} />
                    </CircleButton>
                </div>
            </DialogWindow>
        </div>
    )
}