import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../../reducers/auth';
import { useDispatch } from 'react-redux';


const AuthLinks = () => {
    const dispatch = useDispatch();

    return (
        <Fragment>
            <li className='nav-item'>
                <a className='nav-link' onClick={() => dispatch(logout())}>logout</a>
            </li>
            <li className='nav-item'>
                <Link className='nav-link' to='/user-projects'>My projects</Link>
            </li>
        </Fragment>
    )
}


export default AuthLinks;