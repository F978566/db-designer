import { TableType } from "@/shared/types"

export const TableCard = ({ table }: { table: TableType }) => {
    return (
        <div className="table-card-wrapper">
            <p>{table.name}</p>
        </div>
    )
}