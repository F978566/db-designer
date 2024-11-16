import { observer } from "mobx-react-lite";

import { ColumnType } from "@/shared/types";
import "./style.scss";

export const ColumnCard = observer(({ column }: { column: ColumnType | undefined }) => {
    return (
        <div className="column-card-wrapper">
            <p>{column?.name}</p>
            <p>{column?.data_type}</p>
        </div>
    )
})