import { Fragment } from 'react';
import { Link } from 'react-router-dom';


const GuestsLinks = () => {
    return (
        <Fragment>
            <li className='nav-item'>
                <Link className='nav-link' to='/login'>Login</Link>
            </li>
            <li className='nav-item'>
                <Link className='nav-link' to='/signup'>Sign-Up</Link>
            </li>
        </Fragment>
    )
}

export default GuestsLinks;