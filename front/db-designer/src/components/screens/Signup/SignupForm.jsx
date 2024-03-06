import { useForm } from 'react-hook-form';

const SignupForm = ({ onSubmit }) => {
    const { register, handleSubmit } = useForm({
        mode: 'onChange'
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input
                type='email' 
                placeholder='Email'
                name='email'
                {...register('email', {
                    required: true
                })}
            /><br/>
            <input
                type='text' 
                placeholder='First name'
                name='first_name'
                {...register('first_name', {
                    required: true
                })}
            /><br/>
            <input
                type='text' 
                placeholder='Last name'
                name='last_name'
                {...register('last_name', {
                    required: true
                })}
            /><br/>
            <input
                type='password' 
                placeholder='Password'
                name='password'
                {...register('password', {
                    required: true
                })}
            /><br/>
            <input
                type='password' 
                placeholder='Password'
                name='re_password'
                {...register('re_password', {
                    required: true
                })}
            /><br/>
            <button type='submit'>Sign Up</button>
        </form>
    )
}

export default SignupForm;