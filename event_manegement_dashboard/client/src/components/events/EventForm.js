import React, { useState, useContext, useEffect } from 'react';
import EventContext from '../../context/event/eventContext';


const EventForm = () => {
    const eventContext = useContext(EventContext);

    const { addEvent, updateEvent, clearCurrent, current } = eventContext;

    useEffect(() => {
        if (current !== null) {
            setEvent(current);
        } else {
            setEvent({
                name: '',
                description: '',
                startdatetime: '',
                enddatetime:'',
                type: 'personal'
            });
        }
    }, [eventContext, current]);

    const [event, setEvent] = useState({
        name: '',
        description:'',
        startdatetime: '',
        enddatetime:'',
        type: 'personal'
    });

    const { name, description, startdatetime, enddatetime, type } = event;

    const onChange = e =>
        setEvent({ ...event, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        if (current === null) {
            addEvent(event);
        } else {
            updateEvent(event);
        }
        clearAll();
    };

    const clearAll = () => {
        clearCurrent();
    };

    return (
        <form onSubmit={onSubmit}>
            <h2 className='text-primary'>
                {current ? 'Edit Event' : 'Add Event'}
            </h2>
            <input
                type='text'
                placeholder='Event Name'
                name='name'
                value={name}
                onChange={onChange}
            />
            <input
                type='text'
                placeholder='Event Description'
                name='description'
                value={description}
                onChange={onChange}
            />
            <h4>Event Start Date and Time</h4>
            <input
                type="datetime-local"
                name='startdatetime'
                value={startdatetime}
                onChange={onChange}
            />
            <h4>Event End Date and Time</h4>
            <input
                type="datetime-local"
                name='enddatetime'
                value={enddatetime}
                onChange={onChange}
            />
            <h4>Event Type</h4>
            <input
                type='radio'
                name='type'
                value='personal'
                checked={type === 'personal'}
                onChange={onChange}
            />{' '}
            Personal Event{' '}
            <input
                type='radio'
                name='type'
                value='professional'
                checked={type === 'professional'}
                onChange={onChange}
            />{' '}
            Professional Event
            <div>
                <input
                    type='submit'
                    value={current ? 'Update Event' : 'Add Event'}
                    className='btn btn-primary btn-block'
                />
            </div>
            {current && (
                <div>
                    <button className='btn btn-light btn-block' onClick={clearAll}>
                        Clear
                    </button>
                </div>
            )}
        </form>
    );
};

export default EventForm;
