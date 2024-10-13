import { observer } from "mobx-react-lite";

import { ColumnCard, ColumnModel, ColumnStatus } from "@/entities";
import { useEffect } from "react";
import { LoadBar } from "@/shared/ui";


export const ColumnsList = observer(({ tableId, columnModel }: { tableId: number, columnModel: ColumnModel }) => {
    useEffect(() => {
        columnModel.getTableColumns(tableId);
    }, [tableId])
    
    if (columnModel.status === ColumnStatus.LOADING)
        return <LoadBar />
    return (
        <>
            {
                columnModel.columns.get(tableId)?.map(column => {
                    return (
                        <ColumnCard key={column.id} column={column} />
                    )
                })
            }
        </>
    )
})