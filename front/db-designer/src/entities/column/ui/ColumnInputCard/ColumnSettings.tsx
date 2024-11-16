import { ColumnType } from "@/shared/types"
import { ColumnBooleanProperty, ColumnModel } from "../../model/column"

export const ColumnSettings = ({ column, columnModel }: { column: ColumnType, columnModel: ColumnModel }) => {
    return (
        <div className="settings-input">
            <div>
                <input
                    id="is-primary-key"
                    type="checkbox"
                    defaultChecked={column?.is_primary_key} onClick={() => columnModel.changeBooleanProperty(ColumnBooleanProperty.is_primary_key, column.table, column.id)}
                />
                <label htmlFor="is-primary-key">is-primary-key</label>
            </div>
            <div>
                <input
                    id="is-nullable"
                    type="checkbox"
                    defaultChecked={column?.is_nullable}
                    onClick={() => columnModel.changeBooleanProperty(ColumnBooleanProperty.is_nullable, column.table, column.id)}
                />
                <label htmlFor="is-nullable">is-nullable</label>
            </div>
            <div>
                <input
                    id="is-relationship"
                    type="checkbox"
                    defaultChecked={column?.is_relationship}
                    onClick={() => columnModel.changeBooleanProperty(ColumnBooleanProperty.is_relationship, column.table, column.id)}
                />
                <label htmlFor="is-relationship">is-relationship</label>
            </div>
        </div>
    )
}