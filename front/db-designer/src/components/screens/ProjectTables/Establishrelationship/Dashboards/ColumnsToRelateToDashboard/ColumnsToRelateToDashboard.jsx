import React, { useState } from 'react';
import { Button } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useQuery } from 'react-query';
import { ColumnService } from '../../../../../../services/Column.service';
import { useSelector } from 'react-redux';
import { projectSelector } from '../../../../../../reducers/project';


const ColumnsToRelateToDashboard = ({ table_id, onClick}) => {
    const project_id = useSelector(projectSelector);
    const [anchorEl, setAnchorEl] = useState(null);
    const [isOpen, setIsOpen] = useState(false);


    const { data, isLoading } = useQuery(
        {
            queryKey: ['columnsToRelateTo', table_id, project_id],
            queryFn: async () => await ColumnService.getAllColumnsRelatedToTheProjectExceptOneTable(table_id, project_id)
        }
    );

    if (isLoading) {
        return <p>Loading...</p>
    }

    const handleClose = () => {
        setIsOpen(false);
        setAnchorEl(null);
    }
    
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setIsOpen(Boolean(event.currentTarget));
    }

    const handleClickMenuItem = (column_id) => {
        onClick(column_id, 'to_column');
        setIsOpen(false);
        setAnchorEl(null);
    }

    return (
        <div>
            <Button
            onClick={handleClick}
            >
            columns to
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

export default React.memo(ColumnsToRelateToDashboard);