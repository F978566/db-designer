import { TableCard } from "@/entities";
import { ColumnsInputList } from "@/features/column/ui/ColumnsInputList/ColumnsInputList";
import { ColumnsList } from "@/features/column/ui/ColumnsList/ColumnsList";
import { EnrichedTableCardProps } from "./EnrichedTableCardProps";
import { EnrichedTableCardProvider } from "./EnrichedTableCardProvider";
import { useEnrichedTableCardContext } from "./useEnrichedTableCardContext";

export const EnrichedTableCard = ({ children, table }: EnrichedTableCardProps) => {
    return (
        <EnrichedTableCardProvider.Provider value={{table}}>
             <TableCard table={table}>
                 {children}
             </TableCard>
        </EnrichedTableCardProvider.Provider>
    )
}

EnrichedTableCard.ColumnList = () => {
    const { table } = useEnrichedTableCardContext();

    return (
        table.id ? <ColumnsList tableId={table.id} /> : <></>
    )
}


EnrichedTableCard.ColumnInputList = () => {
    const { table } = useEnrichedTableCardContext();

    return (
        table.id ? <ColumnsInputList tableId={table.id} /> : <></>
    )
}