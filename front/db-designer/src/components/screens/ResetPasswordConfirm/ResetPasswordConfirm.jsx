import React, { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const ResetPasswordConfirm = ({ reset_password_confirm }) => {
    const [requestSent, setRequestSent] = useState(false);
    const { handleSubmit, register } = useForm({
        defaultValues: {
            new_password: '',
            re_new_password: ''
        },
        mode: 'onChange'
    });

    const { uid, token } = useParams();
    // const { new_password, re_new_password } = formData;

    // const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });


    const onSubmit = (data) => {

        reset_password_confirm(uid, token, data.new_password, data.re_new_password);
        setRequestSent(true);
    }

    if (requestSent) {
        return <Navigate to='/' replace={true}/>
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type='password' 
                    placeholder='Password'
                    {...register('new_password', {
                        required: true
                    })}
                /><br/>
                <input
                    type='password' 
                    placeholder='Password'
                    {...register('re_new_password', {
                        required: true
                    })}
                /><br/>
                <button type='submit'>Reset Password</button>
            </form>
        </div>
    )
};



export default ResetPasswordConfirm;