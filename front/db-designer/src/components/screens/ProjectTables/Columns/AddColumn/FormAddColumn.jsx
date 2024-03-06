import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';

const FormAddColumn = ({ register }) => (
    <DialogContent>
        <DialogContentText>
        To subscribe to this website, please enter your email address here. We
        will send updates occasionally.
        </DialogContentText>
        <TextField
        autoFocus
        margin='dense'
        id='column-name'
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
        id='column-description'
        label='Description'
        type='text'
        fullWidth
        variant='standard'
        {...register('description')}
        />
    </DialogContent>
)

export default FormAddColumn;