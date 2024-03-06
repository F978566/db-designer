import React, { useState } from 'react';
import { Button } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useQuery } from 'react-query';
import { TableService } from '../../../../../../services/Tabels.service';
import { useSelector } from 'react-redux';
import { projectSelector } from '../../../../../../reducers/project';


const TablesDashboard = ({ table_id, onClick }) => {
    const project_id = useSelector(projectSelector);
    const [anchorEl, setAnchorEl] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const { data, isLoading } = useQuery(
        {
            queryKey: ['allProjectTablesExceptOne', table_id],
            queryFn: async () => await TableService.getAllProjectTablesExceptOne({project_id, table_id})
        }
    )

    if (isLoading) {
        return <>Loading...</>
    }

    const handleClose = () => {
        setAnchorEl(null);
        setIsOpen(false)
    };

    const handleOpen = (e) => {
        setAnchorEl(e.currentTarget);
        setIsOpen(Boolean(e.currentTarget))
    };

    const handleClickMenuItem = (table_id) => {
        onClick(table_id, 'to_table');
        setIsOpen(false);
        setAnchorEl(null);
    }

    return (
        <>
            <Button
            onClick={handleOpen}
            >
                Table to
            </Button>
            <Menu onClose={handleClose} anchorEl={anchorEl} open={isOpen}>
                {
                    data?.length ? data.map(table => (
                        <MenuItem key={table.id} onClick={() => handleClickMenuItem(table.id)}>{table.name}</MenuItem>
                    )) : <p>There are no other tables</p>
                }
            </Menu>
        </>
    )
}


export default React.memo(TablesDashboard);