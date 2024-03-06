import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';


const ResetPassword = ({ reset_password }) => {
    const [requestSent, setRequestSent] = useState(false);
    const { handleSubmit, register } = useForm({
        mode: 'onChange'
    })

    const onSubmit = data => {
        reset_password(data.email);
        setRequestSent(true);
    }

    if (requestSent) {
        return <Navigate to='/' replace={true}/>
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type='email' 
                    placeholder='Email'
                    name='email'
                    {...register('email', {
                        required: true
                    })}
                /><br/>
                <button type='submit'>Reset Password</button>
            </form>
        </div>
    )
};



export default ResetPassword;