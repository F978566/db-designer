import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm } from 'react-hook-form';
import  { useMutation } from 'react-query';
import { ColumnService } from '../../../../../services/Column.service';
import DataTypesDashboard from './DashBoards/DataTypesDashboard/DataTypesDashboard';
import CheckBoxes from './CheckBoxes';
import FormAddColumn from './FormAddColumn';

const AddColumnDialog = ({ open, handleClose, table_id }) => {
  const { register, handleSubmit, setValue } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: 'name',
      description: '',
      is_primary_key: false,
      is_nullable: false,
      is_relationship: false,
      data_type: 1
    }
  });

  const { mutateAsync } = useMutation((data) => ColumnService.postColumn(data));

  const handleAddColumn = async (data) => {
    const table = table_id;
    await mutateAsync({...data, table})
    window.location.reload();
  }

  return (
    <>
      <button className='btn btn-outline-primary' onClick={handleClose}>
        Add
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <FormAddColumn register={register} />
        <CheckBoxes register={register} />
        <DataTypesDashboard setValue={setValue} />
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit(handleAddColumn)}>Add Column</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}


export default AddColumnDialog;