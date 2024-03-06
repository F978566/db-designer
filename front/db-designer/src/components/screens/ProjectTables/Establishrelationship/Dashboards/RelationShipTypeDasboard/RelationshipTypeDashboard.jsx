import React, { useState } from 'react';
import { Button } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useQuery } from 'react-query';
import RelationshipTypeService from '../../../../../../services/RelationshipType.service';

const RelationshipTypeDashboard = ({ onClick }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const { data, isLoading } = useQuery(
        {
            queryKey: ['relationshiptype'],
            queryFn: RelationshipTypeService.getRelationship
        }
    )

    if (isLoading) {
        return <p>Loading...</p>
    }

    const handleClose = () => {
        setIsOpen(false);
        setAnchorEl(null);
    }
    
    const handleClickMenuItem = (relationship_type) => {
        onClick(relationship_type, 'relationship_type');
        setIsOpen(false);
        setAnchorEl(null);
    }

    const handleOpen = (e) => {
        setAnchorEl(e.currentTarget);
        setIsOpen(Boolean(e.currentTarget));
    }

    return (
        <div>
            <Button
            onClick={(e) => handleOpen(e)}
            >
            relationship
            </Button>
            <Menu onClose={handleClose} anchorEl={anchorEl} open={isOpen}>
                <MenuItem>Without relationship</MenuItem>
                {
                    data?.length ? data.map(relationshipType => (
                        <MenuItem key={relationshipType.id} onClick={() => handleClickMenuItem(relationshipType.id)}>{relationshipType.name}</MenuItem>
                    )) : <p>There are not relationship types</p>
                }
            </Menu>
        </div>
    )
}


export default React.memo(RelationshipTypeDashboard);