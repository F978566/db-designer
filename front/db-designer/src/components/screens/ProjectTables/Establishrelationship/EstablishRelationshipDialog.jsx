import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query';
import RelationshipTypeDashboard from './Dashboards/RelationShipTypeDasboard/RelationshipTypeDashboard';
import ColumnsToRelateToDashboard from './Dashboards/ColumnsToRelateToDashboard/ColumnsToRelateToDashboard';
import TableColumnsDashboard from './Dashboards/TableColumnsDashboard/TableColumnsDashboard';
import TablesDashboard from './Dashboards/TablesDashboard/TablesDashboard';
import { RelationshipService } from '../../../../services/Relationship.service';
import { useSelector } from 'react-redux';
import { projectSelector } from '../../../../reducers/project';


const EstablishRelationshipDialog = ({ handleClose, isOpen, table_id }) => {
    const project_id = useSelector(projectSelector);
    const { setValue, handleSubmit, getValues } = useForm({
        mode: 'onChange',
        defaultValues: {
            'project': +project_id,
            'relationship_type': -1,
            'to_column': -1,
            'from_table': table_id,
            'to_table': -1
        }
    });

    const mutation = useMutation(RelationshipService.postRelationship, {
        onError: (error) => {
            console.log(error);
        }
    })

    const fillTheRegister = (content, field) => {
        setValue(field, content)
    };

    const handleEstablichRelationship = () => {
        const data = getValues();
        mutation.mutate(data);
    };

    return (
        <>
            <button className='btn btn-outline-primary' onClick={handleClose}>
                Establish relationship
            </button>
            <Dialog open={isOpen} onClose={handleClose}>
                <RelationshipTypeDashboard onClick={fillTheRegister}/>
                <ColumnsToRelateToDashboard table_id={table_id} onClick={fillTheRegister} />
                <TableColumnsDashboard table_id={table_id} onClick={fillTheRegister} />
                <TablesDashboard table_id={table_id} onClick={fillTheRegister}/>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleEstablichRelationship}>Add Column</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default EstablishRelationshipDialog;
