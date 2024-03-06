import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { TableService } from '../../../../../services/Tabels.service';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query'
import { useSelector } from 'react-redux';
import { projectSelector } from '../../../../../reducers/project';
import DialogForm from './DialogForm';


const EditTableDialog = ({ handleClose, open, table_id }) => {
    const project_id = useSelector(projectSelector);

    const { register, handleSubmit } = useForm({
        mode: 'onChange'
    })

    const { mutateAsync } = useMutation((data) => TableService.patchTable(data))

    const onSubmit = async (data) => {
        const project = project_id;
        await mutateAsync({...data, project, table_id});
        window.location.reload();
    }

    return (
        <div>
            <Button variant='outlined' onClick={handleClose}>
                Edit Table
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Table</DialogTitle>
                    <DialogForm register={register}/>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit(onSubmit)}>Add Table</Button>
                </DialogActions>
            </Dialog>
    </div>
    );
}

export default EditTableDialog;