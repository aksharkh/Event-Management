import React , { Fragment , useContext } from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

import AuthContext from '../../context/auth/authContext';
import EventContext from '../../context/event/eventContext';


const Navbar = ({ title , icon }) => {

    const authContext = useContext(AuthContext);

    const eventContext = useContext(EventContext);

    const { isAuthenticated , logout , user } = authContext;

    const { clearEvents } = eventContext;

    const onLogout = () => {
        logout();
        clearEvents();
    }

    const authLinks = (
        <Fragment>
            <li className="nav-item">Hello, { user && user.name }   </li>
            <li className="nav-item">
                <button onClick={onLogout} className="btn btn-1">
                    <i className="fas fa-sign-out-alt"></i> <span className='hide-sm'>Logout</span>
                </button>
            </li>
        </Fragment>
    );

    const guestLinks = (
        <Fragment>
            <li>
                <Link to='/register'>
                    <button className="btn btn-1">Sign Up</button>
                </Link>
            </li>
            <li>
                <Link to='/login'>
                    <button className="btn btn-1">Log In</button>
                </Link>
            </li>
        </Fragment>
    );

    return (
        <div className="navbar bg-primary">
            <h1><i className={icon}/>Hackaholics</h1>
            <ul>
                { isAuthenticated ? authLinks : guestLinks }
            </ul>
        </div>
    )
}

Navbar.propTypes = {
    title : PropTypes.string.isRequired,
    icon : PropTypes.string,
}

Navbar.defaultProps = {
    icon : 'fas fa-calendar-alt'
}

export default Navbar
