import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { loadUser, login } from '../../../actions/auth';
import { selectIsAuthenticated } from '../../../reducers/auth';


const Login = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(selectIsAuthenticated);

    const {register, handleSubmit} = useForm({
        mode: 'onChange'
    });

    const onSubmit = data => {
        dispatch(login({...data}))
        .then(() => dispatch(loadUser()))
        .catch((e) => console.log(e))
    };

    if (isAuthenticated) {
        return <Navigate to="/" replace={true}/>
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    className='form-control'
                    type="email" 
                    placeholder="Email"
                    name="email"
                    {...register('email', {
                        required: true
                    })}
                /><br/>
                <input
                    className='form-control'
                    type="password" 
                    placeholder="Password"
                    name="password"
                    {...register('password', {
                        required: true
                    })}
                /><br/>
                <button className='btn btn-primary' type='submit'>Login</button>
            </form>
            <p>
                Don't have an account <Link to='/signup'>Sign Up</Link>
            </p>
            <p>
                Forgot password <Link to='/reset-password'>Reset Password</Link>
            </p>
        </div>
    );
};

export default Login;