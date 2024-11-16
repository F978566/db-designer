import { observer } from "mobx-react-lite";

import { ColumnInputCard, ColumnModel, ColumnStatus } from "@/entities";
import { LoadBar } from "@/shared/ui";


export const ColumnsInputList = observer(({ tableId, columnModel }: { tableId: number, columnModel: ColumnModel }) => {
    if (columnModel.status === ColumnStatus.LOADING)
        return <LoadBar />

    return (
        <>
            {
                columnModel.columns.get(tableId)?.map(column => {
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