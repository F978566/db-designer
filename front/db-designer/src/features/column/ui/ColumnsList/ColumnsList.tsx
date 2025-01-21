import { observer } from "mobx-react-lite";

import { ColumnCard, ColumnStatus } from "@/entities";
import { PropsWithChildren } from "react";
import { LoadBar } from "@/shared/ui";
import { ColumnType } from "@/shared/types";
import { useTableListContext } from "@/features/tables/util/useTableListContext";


type ColumnListProps = PropsWithChildren & {
    tableId: number;
}

export const ColumnsList = observer(({ tableId }: ColumnListProps) => {
    const { columnModel } = useTableListContext()

    if (columnModel.status === ColumnStatus.LOADING)
        return <LoadBar />


    let newColumns: ColumnType[] = columnModel.columns.filter(col => col.table === tableId)

    return (
        <>
            <>
                {
                    newColumns.map(column => {
                        return (
                            <ColumnCard key={column.id} column={column} />
                        )
                    })
                }
            </>
        </>
    )
})