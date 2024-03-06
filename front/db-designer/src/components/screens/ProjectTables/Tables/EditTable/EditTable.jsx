import EditTableDialog from "./EditTableDialog";
import { useState } from "react";

const EditTable = ({ toggleIsMovable, table_id }) => {
    const [open, setOpen] = useState(false);

    
    const handleClose = () => {
        setOpen(prev => !prev);
        toggleIsMovable(!open);
    }
    

    return (
        <div>
            <EditTableDialog handleClose={handleClose} open={open} table_id={table_id}/>
        </div>
    )
}

export default EditTable;