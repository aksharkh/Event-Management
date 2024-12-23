import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskTracker = () => {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState({ name: '', deadline: '', attendee: '', event: '' });

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const res = await axios.get('/api/tasks');
            setTasks(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const onChange = e => setTask({ ...task, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            await axios.post('/api/tasks', task);
            setTask({ name: '', deadline: '', attendee: '', event: '' }); // Clear form after submission
            fetchTasks(); // Refresh the list after adding
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h2 className='text-primary'>Tasks</h2>
            <form onSubmit={onSubmit}>
                <input type="text" name="name" value={task.name} onChange={onChange} placeholder="Task Name" required />
                <input type="datetime-local" name="deadline" value={task.deadline} onChange={onChange} required />
                <input type="text" name="attendee" value={task.attendee} onChange={onChange} placeholder="Attendee ID" required />
                <input type="text" name="event" value={task.event} onChange={onChange} placeholder="Event Name" required />
                <button type="submit" className="btn btn-primary btn-block">Add Task</button>
            </form>
            <ul>
                {tasks.map(task => (
                    <li key={task._id}>
                        {task.name} - Deadline: {task.deadline} - Status: {task.status}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskTracker;