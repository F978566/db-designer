import { observer } from "mobx-react-lite";

import { ColumnType } from "@/shared/types";

export const ColumnCard = observer(({ column }: { column: ColumnType | undefined }) => {
    return (
        <>
            {column?.name}
        </>
    )
})