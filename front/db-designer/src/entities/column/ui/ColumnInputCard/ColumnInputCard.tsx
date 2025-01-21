import { observer } from "mobx-react-lite";
import { useState } from "react";

import { ColumnType } from "@/shared/types";
import { dataTypeModel } from "@/entities/datatype";
import { ArrowDownSvg, Dropdown } from "@/shared/ui";
import { ColumnSettings } from "./ColumnSettings";
import { columnModel } from "../../model/column";
import "./style.scss";
import { SetRelationship } from "./SetRelationship";


export const ColumnInputCard = observer(({ column }: { column: ColumnType | undefined }) => {
    const [show, setShow] = useState(false)

    if (column === undefined)
        return <></>


    return (
        <div>
            <div className="column-input-card-wrapper">
                <ArrowDownSvg onClick={() => setShow(prev => !prev)} className="show-settings-svg" />
                <input
                    onChange={e => columnModel.setColumnName(column.id!!, e.target.value)}
                    className="column-input"
                    type="text"
                    defaultValue={column?.name}
                />
                <Dropdown initialValue={column.data_type_name!!} content={dataTypeModel.data} />
            </div>
            {
                show ?
                    <ColumnSettings column={column} />
                    :
                    <></>
            }
            {
                columnModel.columns.find(col => column.id == col.id) ?
                    <SetRelationship />
                    :
                    <></>
            }
        </div>
    )
})