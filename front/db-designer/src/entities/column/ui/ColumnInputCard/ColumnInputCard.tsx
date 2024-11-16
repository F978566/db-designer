import { observer } from "mobx-react-lite";

import { ColumnType } from "@/shared/types";
import { dataTypeModel } from "@/entities/datatype";
import { ArrowDownSvg, Dropdown } from "@/shared/ui";
import { useState } from "react";
import { columnModel } from "../../model/column";
import { ColumnSettings } from "./ColumnSettings";
import "./style.scss";


export const ColumnInputCard = observer(({ column }: { column: ColumnType | undefined }) => {
    const [show, setShow] = useState(false)

    if (column === undefined)
        return <></>

    return (
        <div>
            <div className="column-input-card-wrapper">
                <ArrowDownSvg onClick={() => setShow(prev => !prev)} className="show-settings-svg" />
                <input className="column-input" type="text" defaultValue={column?.name} />
                <Dropdown initialValue={column.data_type} content={dataTypeModel.data} />
            </div>
            {
                show ?
                    <ColumnSettings column={column} columnModel={columnModel}/>
                    :
                    <></>
            }
        </div>
    )
})