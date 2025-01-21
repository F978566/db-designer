import { observer } from "mobx-react-lite";

import { ColumnType } from "@/shared/types";
import "./style.scss";
import { dataTypeModel } from "@/entities/datatype";

export const ColumnCard = observer(({ column }: { column: ColumnType | undefined }) => {
    return (
        <div className="column-card-wrapper">
            <p>{column?.name}</p>
            <p>{dataTypeModel.data.find(dataType => dataType.id === column?.data_type)?.name}</p>
        </div>
    )
})