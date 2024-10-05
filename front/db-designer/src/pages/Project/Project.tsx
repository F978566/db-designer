import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { tableModel } from "@/entities/table";


export const Project = observer(() => {
    const { id = "" } = useParams();

    useEffect(() => {
        tableModel.get(Number.parseInt(id));
    }, [])

    return (
        <>
            {
                tableModel.tables.map(table => (
                    <div key={table.id}>
                        {table.name}
                    </div>
                ))
            }
        </>
    )
})