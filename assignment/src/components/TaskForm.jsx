import React, { useState, useEffect } from 'react';

const TaskForm = ({ addTask, onCancel, existingTask }) => {
    const [task, setTask] = useState({
        title: '',
        description: '',
        dueDate: '',
        status: 'ToDo',  // Default status
        assignedUser: 'User A', 
        priority: 'Low',
    });

    useEffect(() => {
        if (existingTask) {
            setTask(existingTask);
        }
    }, [existingTask]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask((prevTask) => ({ ...prevTask, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!task.title || !task.description || !task.assignedUser || !task.dueDate) {
            alert("All fields are required");
            return;
        }
        addTask(task);
        setTask({ title: '', description: '', dueDate: '', status: 'ToDo', assignedUser: 'User A', priority: 'Low' });
    };

    return (
        <form onSubmit={handleSubmit} >
            <input
                type="text"
                name="title"
                placeholder="Title"
                value={task.title}
                onChange={handleChange}
                required
            />
            <textarea
                name="description"
                placeholder="Description"
                value={task.description}
                onChange={handleChange}
                required
            />
            <input
                type="date"
                name="dueDate"
                value={task.dueDate}
                onChange={handleChange}
                required
            />
            <select
                name="assignedUser"
                value={task.assignedUser}
                onChange={handleChange}
                required
            >
                <option value="">Select User</option>
                <option value="User A">User A</option>
                <option value="User B">User B</option>
                <option value="User C">User C</option>
                <option value="User D">User D</option>
                <option value="User E">User E</option>
                <option value="User F">User F</option>
            </select>
            <select
                name="priority"
                value={task.priority}
                onChange={handleChange}
                required
            >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>
            <select
                name="status"
                value={task.status}
                onChange={handleChange}
                required
            >
                <option value="ToDo">To Do</option>
                <option value="InProgress">In Progress</option>
                <option value="Completed">Completed</option>
            </select>
            <button type="submit">Save Task</button>
            <button type="button" onClick={onCancel} className="cancel-button">
                Cancel
            </button>
        </form>
    );
};

export default TaskForm;
