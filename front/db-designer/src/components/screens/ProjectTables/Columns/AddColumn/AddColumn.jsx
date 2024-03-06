import React, { useState } from 'react';
import AddColumnDialog from './AddColumnDialog';

const AddColumn = ({ toggleIsMovable, table_id }) => {
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(prev => !prev);
        toggleIsMovable(!open);
    };


    return (
        <AddColumnDialog table_id={table_id} open={open} handleClose={handleClose} />
    );
}

export default React.memo(AddColumn);