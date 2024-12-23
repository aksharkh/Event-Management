import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AttendeeManagement = () => {
    const [attendees, setAttendees] = useState([]);
    const [attendee, setAttendee] = useState({ name: '', email: '', event: '' });

    useEffect(() => {
        fetchAttendees();
    }, []);

    const fetchAttendees = async () => {
        try {
            const res = await axios.get('/api/attendees');
            setAttendees(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const onChange = e => setAttendee({ ...attendee, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            await axios.post('/api/attendees', attendee);
            setAttendee({ name: '', email: '', event: '' }); // Clear form after submission
            fetchAttendees(); // Refresh the list after adding
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h2 className='text-primary'>Attendees</h2>
            <form onSubmit={onSubmit}>
                <input type="text" name="name" value={attendee.name} onChange={onChange} placeholder="Name" required />
                <input type="email" name="email" value={attendee.email} onChange={onChange} placeholder="Email" required />
                <input type="text" name="event" value={attendee.event} onChange={onChange} placeholder="Event Name" required />
                <button type="submit" className="btn btn-primary btn-block">Add Attendee</button>
            </form>
            <ul>
                {attendees.map(attendee => (
                    <li key={attendee._id}>
                        {attendee.name} ({attendee.email}) - Event: {attendee.event}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AttendeeManagement;