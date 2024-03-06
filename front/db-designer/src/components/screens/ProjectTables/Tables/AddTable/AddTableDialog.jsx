import { useMutation } from 'react-query';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm } from 'react-hook-form';
import { TableService } from '../../../../../services/Tabels.service';
import AddTableForm from './AddTableForm';
import { useSelector } from 'react-redux';
import { projectSelector } from '../../../../../reducers/project';


const AddTableDialog = ({ open, handleClose }) => {
  const { register, handleSubmit } = useForm({
    mode: 'onChange'
  });
  const project_id = useSelector(projectSelector);

  const { mutateAsync } = useMutation((data) => TableService.postTable({...data}));

  const onSubmit = async (data) => {
    const project = project_id;
    console.log({...data, project})
    await mutateAsync({...data, project});
    window.location.reload();
  }

  return (
    <div>
      <Button variant='outlined' onClick={handleClose}>
        Add Table
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
          <AddTableForm register={register} />
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit(onSubmit)}>Add Table</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


export default AddTableDialog;