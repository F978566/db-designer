import { observer } from "mobx-react-lite";
import { useEffect } from "react";

import { TableCard, TableStatus } from "@/entities";
import { TableModel } from "@/entities";
import { ColumnsList } from "@/features/column/ui/ColumnsList/ColumnsList";
import { columnModel } from "@/entities/column/model/column";
import { LoadBar } from "@/shared/ui";
// import "./style.scss"

export const TableList = observer(({ projectId, tableModel }: { projectId: number, tableModel: TableModel }) => {
    useEffect(() => {
        tableModel.get(projectId);
    }, [projectId])

    if (tableModel.status === TableStatus.LOADING)
        return <LoadBar />

    return (
        <>
            {
                tableModel.tables?.map(
                    table => {
                        return (
                            <TableCard key={table.id} table={table}>
                                <ColumnsList tableId={table?.id ?? 0} columnModel={columnModel}/>
                            </TableCard>
                        )
                    }
                )
            }
        </>
    )
})