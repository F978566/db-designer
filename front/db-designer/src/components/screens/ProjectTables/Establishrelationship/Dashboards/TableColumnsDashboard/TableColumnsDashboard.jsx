import React, { useState } from 'react';
import { Button } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useQuery } from 'react-query';
import { ColumnService } from '../../../../../../services/Column.service';

const TableColumnsDashboard = ({ table_id, onClick }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const { data, isLoading } = useQuery(
        {
            queryKey: ['columns', table_id],
            queryFn: async () => await ColumnService.getColumnsByTable(table_id)
        }
    );

    if (isLoading) {
        return <p>Loading...</p>
    }

    const handleClose = () => {
        setIsOpen(false);
        setAnchorEl(null);
    }
    
    const handleOpen = (e) => {
        setAnchorEl(e.currentTarget);
        setIsOpen(Boolean(e.currentTarget));
    }

    const handleClickMenuItem = (column_id) => {
        onClick(column_id, 'from_column');
        setIsOpen(false);
        setAnchorEl(null);
    }

    return (
        <div>
            <Button
            onClick={handleOpen}
            >
            columns from
            </Button>
            <Menu onClose={handleClose} anchorEl={anchorEl} open={isOpen}>
                {
                    data?.length ? data.map(column => (
                        <MenuItem key={column.id} onClick={() => handleClickMenuItem(column.id)}>{column.name}</MenuItem>
                    ))
                    : <p>There are no columns</p>
                }
            </Menu>
        </div>
    )
}

export default React.memo(TableColumnsDashboard);