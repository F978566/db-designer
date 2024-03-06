import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { signup } from '../../../actions/auth';
import { selectIsAuthenticated } from '../../../reducers/auth';
import { useSelector, useDispatch } from 'react-redux';
import SignupForm from './SignupForm';

const Signup = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(selectIsAuthenticated);

    const [accountCreated, setAccountCreated] = useState(false);

    const onSubmit = data => {
        if (data.password === data.re_password){
            dispatch(signup({...data}));
            setAccountCreated(true);
        }
    }

    if (isAuthenticated) {
        return <Navigate to='/' replace={true}/>
    }
    if (accountCreated) {
        return <Navigate to='/login' replace={true}/>
    }

    return (
        <div>
            <SignupForm onSubmit={onSubmit} />
            <p>
                Already have an account <Link to='/login'>Login</Link>
            </p>
        </div>
    )
};

export default Signup;