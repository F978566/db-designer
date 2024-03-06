import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../components/ui/Navbar/Navbar';
import { selectIsAuthenticated } from '../reducers/auth';
import { checkAuthenticated, loadUser } from '../actions/auth';

const Layout = (props) => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(selectIsAuthenticated);

    useEffect(() => {
        dispatch(checkAuthenticated())
        .then(() => dispatch(loadUser()))
        .catch(e => console.log(e))
    }, [])

    return (
        <div>
            <Navbar/>
            {props.children}
        </div>
    )
};

export default Layout;