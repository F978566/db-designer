import { ColumnType } from "@/shared/types"
import { ColumnBooleanProperty, columnModel } from "../../model/column"

export const ColumnSettings = ({ column }: { column: ColumnType }) => {
    return (
        <div className="settings-input">
            <div>
                <input
                    id="is-primary-key"
                    type="checkbox"
                    defaultChecked={column?.is_primary_key}
                    onClick={() => columnModel.changeBooleanProperty(ColumnBooleanProperty.is_primary_key, column?.id ?? 0)}
                />
                <label htmlFor="is-primary-key">is-primary-key</label>
            </div>
            <div>
                <input
                    id="is-nullable"
                    type="checkbox"
                    defaultChecked={column?.is_nullable}
                    onClick={() => columnModel.changeBooleanProperty(ColumnBooleanProperty.is_nullable, column?.id ?? 0)}
                />
                <label htmlFor="is-nullable">is-nullable</label>
            </div>
            <div>
                <input
                    id="is-relationship"
                    type="checkbox"
                    defaultChecked={column?.is_relationship}
                    onClick={() => columnModel.changeBooleanProperty(ColumnBooleanProperty.is_relationship, column?.id ?? 0)}
                />
                <label htmlFor="is-relationship">is-relationship</label>
            </div>
        </div>
    )
}