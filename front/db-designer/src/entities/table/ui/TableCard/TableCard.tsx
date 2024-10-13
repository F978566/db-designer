import { PropsWithChildren } from "react";

import { TableType } from "@/shared/types";
import "./style.scss";


type TableCardProps = PropsWithChildren & {
    table: TableType;
}


export const TableCard = ({ children, table }: TableCardProps) => {
    return (
        <div className="table-card-wrapper">
            <p>{table.name}</p>
            <hr />
            { children }
        </div>
    )
}