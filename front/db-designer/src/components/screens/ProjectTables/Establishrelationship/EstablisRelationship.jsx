import React, { useState } from 'react';
import EstablishRelationshipDialog from "./EstablishRelationshipDialog"

const EstablishRelationship = ({ toggleIsMovable, table_id }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClose = () => {
        setIsOpen(prev => !prev);
        toggleIsMovable(!isOpen);
    }

    return (
        <EstablishRelationshipDialog handleClose={handleClose} isOpen={isOpen} table_id={table_id} />
    );
}

export default EstablishRelationship;