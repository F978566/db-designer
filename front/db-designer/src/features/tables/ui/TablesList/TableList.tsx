import { observer } from "mobx-react-lite";
import { useEffect } from "react";

import { TableStatus } from "@/entities";
import { TableModel } from "@/entities";
import { columnModel } from "@/entities/column/model/column";
import { LoadBar } from "@/shared/ui";
import { EditTableDialog } from "@/features/tables/ui/EditTableDialog/EditTableDialog";
import { EnrichedTableCard } from "../EnrichedTableCard/EnrichedTableCard";
import "./style.scss";


export const TableList = observer(({ projectId, tableModel }: { projectId: number, tableModel: TableModel }) => {
    useEffect(() => {
        tableModel.get(projectId);
    }, [projectId])

    useEffect(() => {
        columnModel.getProjectColumns(projectId ?? 0);
    }, [projectId])

    if (tableModel.status === TableStatus.LOADING)
        return <LoadBar />

    return (
        <>
            {
                tableModel.tables?.map(
                    table => {
                        return (
                            <div key={table.id}>
                                <EnrichedTableCard table={table} columnModel={columnModel}>
                                    <EnrichedTableCard.ColumnList />
                                </EnrichedTableCard>
                                <EditTableDialog table={table} tableModel={tableModel}/>
                            </div>
                        )
                    }
                )
            }
        </>
    )
})