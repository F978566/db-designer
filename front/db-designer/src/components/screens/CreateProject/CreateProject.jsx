import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { useForm } from 'react-hook-form'
import { ProjectService } from '../../../services/Project.service';
import { selectUser } from '../../../reducers/auth';
import { useSelector } from 'react-redux/es/hooks/useSelector';


const CreateProject = () => {
    const user = useSelector(selectUser);

    const {register, handleSubmit, reset} = useForm({
        mode: "onChange"
    });

    const [isSubmit, setIsSubmit] = useState(false);

    const { mutateAsync } = useMutation((data) => ProjectService.postProject({...data, user}), {
        onSuccess: () => {
            reset();
        },
        onError: data => {
            console.log(error);
            console.log(data);
        }
    })

    const onSubmit = data => {
        mutateAsync(data);
        setIsSubmit(true);
    };

    if (isSubmit)
        return <Navigate to='/user-projects' replace={true}/>


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='mb-2'>
                <input
                    className='form-control'
                    type='text' 
                    placeholder='Name'
                    {...register('name', {
                        required: true
                    })}
                /><br/>
                <input
                    className='form-control'
                    type='text' 
                    placeholder='Description'
                    {...register('description')}
                /><br/>
                <button type='submit' className='btn btn-primary'>Login</button>
            </div>
        </form>
    )
}

export default CreateProject;