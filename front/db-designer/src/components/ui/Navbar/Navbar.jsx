import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../../../reducers/auth';
import GuestsLinks from './GuestsLinks';
import AuthLinks from './AuthLinks';

const Navbar = () => {
    const isAuthenticated = useSelector(selectIsAuthenticated);

    return (
        <nav className='navbar navbar-expand-lg bg-body-tertiary'>
            <div className='container-fluid'>
                <Link className='navbar-brand' to='/'>Db-designer</Link>
                <button
                    className='navbar-toggler'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#navbarSupportedContent'
                    aria-controls='navbarSupportedContent'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                >
                <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                    <li className='nav-item'>
                    <Link className='nav-link active' aria-current='page' to='/'>Home</Link>
                    </li>
                    { isAuthenticated ? <AuthLinks /> : <GuestsLinks /> }
                </ul>
                </div>
            </div>
        </nav>
    )
}


export default Navbar;