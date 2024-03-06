import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { verify } from '../../../actions/auth';
import { useDispatch } from 'react-redux';


const Activate = () => {
    const dispatch = useDispatch();

    const [verified, setVerified] = useState(false);
    const { uid, token } = useParams();
    
    const verify_account = e => {
        e.preventDefault();
        
        dispatch(verify({ uid, token }));
        setVerified(true);
    }

    if (verified) {
        return <Navigate to='/' replace={true}/>
    }

    return (
        <div>
            <button
                onClick={verify_account}
                type='button'
            >
            Activate account
            </button>
        </div>
    )
};

export default Activate;