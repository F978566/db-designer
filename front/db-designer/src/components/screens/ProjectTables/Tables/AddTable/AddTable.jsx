import React, { useState } from 'react';
import AddTableDialog from './AddTableDialog';

const AddTable = () => {
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(prev => !prev)
    }

    return (
        <div className='fixed-bottom p-4'>
            <div className='card-footer'>
                Featured
            </div>
            <div className='card-body'>
                <AddTableDialog handleClose={handleClose} open={open} />
            </div>
        </div>
    )
}

export default AddTable;