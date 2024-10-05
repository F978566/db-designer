import { observer } from "mobx-react-lite";

import { TableCard } from "@/entities";
import { TableModel } from "@/entities";

export const TableList = observer(({ tableModel }: { tableModel: TableModel }) => {
    return (
        <div className="table-list-wrapper">
            {
                tableModel.tables?.map(
                    table => {
                        return (
                            <TableCard key={table.id} table={table} />
                        )
                    }
                )
            }
        </div>
    )
})