import { observer } from "mobx-react-lite";

import { ColumnInputCard, ColumnStatus } from "@/entities";
import { LoadBar } from "@/shared/ui";
import { useTableListContext } from "@/features/tables/util/useTableListContext";


export const ColumnsInputList = observer(({ tableId }: { tableId: number }) => {
    const { columnModel } = useTableListContext()

    if (columnModel.status === ColumnStatus.LOADING)
        return <LoadBar />

    const columnList = columnModel.columns.filter(
        column => column.table === tableId
    )


    return (
        <>
            {
                columnList.map(column => {
                    return (
                        <div key={column.id}>
                            <ColumnInputCard column={column} />
                        </div>
                    )
                })
            }
        </>
    )
})