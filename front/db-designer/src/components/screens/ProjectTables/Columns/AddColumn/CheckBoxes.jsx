import Checkbox from '@mui/material/Checkbox';
import { FormControlLabel } from '@mui/material';

const CheckBoxes = ({ register }) => (
    <div>
        <FormControlLabel {...register('is_nullable')} control={<Checkbox />} label="nullable" />
        <FormControlLabel {...register('is_primary_key')} control={<Checkbox />} label="primary key" />
    </div>
)

export default CheckBoxes;