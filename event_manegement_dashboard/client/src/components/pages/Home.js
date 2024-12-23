import React, { useContext, useEffect } from 'react';

import Events from '../events/Events';
import EventForm from '../events/EventForm';
import EventFilter from '../events/EventFilter';

import AuthContext from '../../context/auth/authContext';

const Home = () => {
    const authContext = useContext(AuthContext);

    const { loadUser } = authContext;

    useEffect(() => {
        loadUser();
        //eslint-disable-next-line
    }, []);

    return (
        <div className='grid-2'>
            <div>
                <EventForm />
            </div>
            <div>
                <EventFilter />
                <Events />
            </div>
        </div>
    );
};

export default Home;
