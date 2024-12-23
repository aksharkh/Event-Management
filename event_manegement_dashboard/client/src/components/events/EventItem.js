import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import EventContext from '../../context/event/eventContext';

const EventItem = ({ event }) => {
    const eventContext = useContext(EventContext);
    const { deleteEvent, setCurrent, clearCurrent } = eventContext;

    const { _id, name, description, startdatetime, enddatetime, type } = event;

    const onDelete = () => {
        deleteEvent(_id);
        clearCurrent();
    };

    return (
        <div className='card bg-light'>
            <h3 className='text-primary text-left'>
                {name}{' '}
                <span
                    style={{ float: 'right' }}
                    className={
                        'badge ' +
                        (type === 'professional' ? 'badge-success' : 'badge-primary')
                    }
                >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
            </h3>
            <ul className='list'>
                {description && (
                    <li>
                        <i className='fas fa-edit' /> {description}
                    </li>
                )}
                {startdatetime && (
                    <li>
                        <i className='fas fa-calendar-check'/> {startdatetime}
                    </li>
                )}
                {enddatetime && (
                    <li>
                        <i className='fas fa-calendar-times'/> {enddatetime}
                    </li>
                )}
            </ul>
            <p>
                <button
                    className='btn btn-dark btn-sm'
                    onClick={() => setCurrent(event)}
                >
                    Edit
                </button>
                <button className='btn btn-danger btn-sm' onClick={onDelete}>
                    Delete
                </button>
            </p>
        </div>
    );
};

EventItem.propTypes = {
    event: PropTypes.object.isRequired
};

export default EventItem;
