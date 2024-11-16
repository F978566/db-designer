import { ColumnModel, TableCard } from "@/entities";
import { ColumnsInputList } from "@/features/column/ui/ColumnsInputList/ColumnsInputList";
import { ColumnsList } from "@/features/column/ui/ColumnsList/ColumnsList";
import { TableType } from "@/shared/types";
import { PropsWithChildren, createContext, useContext } from "react";


type EnrichedTableCardProps = PropsWithChildren & {
    table: TableType;
    columnModel: ColumnModel;
}


const EnrichedTableCardProvider = createContext<EnrichedTableCardProps | null>(null);

const useEnrichedTableCardContext = () => {
    const context = useContext(EnrichedTableCardProvider);
    
    if (!context)
        throw new Error("No context");

    return context;
}

export const EnrichedTableCard = ({ children, table, columnModel }: EnrichedTableCardProps) => {
    return (
        <EnrichedTableCardProvider.Provider value={{table, columnModel}}>
            <TableCard table={table}>
                {children}
            </TableCard>
        </EnrichedTableCardProvider.Provider>
    )
}

EnrichedTableCard.ColumnList = () => {
    const { table, columnModel } = useEnrichedTableCardContext();

    return (
        <ColumnsList tableId={table?.id ?? 0} columnModel={columnModel}/>
    )
}


EnrichedTableCard.ColumnInputList = () => {
    const { table, columnModel } = useEnrichedTableCardContext();

    return (
        <ColumnsInputList tableId={table?.id ?? 0} columnModel={columnModel}/>
    )
}