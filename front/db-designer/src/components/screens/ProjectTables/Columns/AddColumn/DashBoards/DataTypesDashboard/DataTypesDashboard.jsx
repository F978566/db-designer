import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { useQuery } from 'react-query';
import DataTypeService from '../../../../../../../services/DataType.service';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const DataTypesDashboard = ({ setValue }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setIsOpen(Boolean(event.currentTarget));
    };

    const handleClose = () => {
        setAnchorEl(null);
        setIsOpen(false);
    };

    const { data } = useQuery({
        queryKey: 'data_types',
        queryFn: DataTypeService.getAllDataTypes
    })

    const handleSetValue = (typeName) => {
        setValue('data_type', typeName);
        setAnchorEl(null);
        setIsOpen(false);
    };

    return (
    <div>
        <Button
        id="demo-positioned-button"
        aria-controls={isOpen ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={isOpen ? 'true' : undefined}
        onClick={handleClick}
        >
        Data types
        </Button>
        <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleClose}
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
        }}
        >
        {data?.length ? data.map(type => (
            <MenuItem key={type.id} onClick={() => handleSetValue(type.id)}>{type.name}</MenuItem>
        )) : <p>There is no types</p>}
        </Menu>
    </div>
    );
}


export default React.memo(DataTypesDashboard);