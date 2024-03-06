import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';

const DialogForm = ({ register }) => (
    <DialogContent>
        <TextField
            autoFocus
            margin='dense'
            id='table-name'
            label='Table name'
            type='text'
            fullWidth
            variant='standard'
            {...register('name', {
                required: true
            })}
        />
        <TextField
            autoFocus
            margin='dense'
            id='table-description'
            label='Table description'
            type='text'
            fullWidth
            variant='standard'
            {...register('description')}
        />
    </DialogContent>
)

export default DialogForm;