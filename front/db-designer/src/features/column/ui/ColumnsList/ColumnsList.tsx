import { observer } from "mobx-react-lite";

import { ColumnCard, ColumnModel, ColumnStatus } from "@/entities";
import { PropsWithChildren } from "react";
import { LoadBar } from "@/shared/ui";


type ColumnListProps = PropsWithChildren & {
    tableId: number;
    columnModel: ColumnModel;
}

export const ColumnsList = observer(({ children, tableId, columnModel }: ColumnListProps) => {
    if (columnModel.status === ColumnStatus.LOADING)
        return <LoadBar />

    return (
        <>
            <>
                {
                    columnModel.columns.get(tableId ?? 0)?.map(column => {
                        return (
                            <ColumnCard key={column.id} column={column} />
                        )
                    })
                }
            </>
        </>
    )
})