import React from 'react';

const TaskCard = ({ task, onEdit, onDelete }) => {
    return (
        <div >
            <h3 >Title:{task.title}</h3>
            <p >description{task.description}</p>
            <p ><strong>Due Date:</strong> {task.dueDate}</p>
            <p ><strong>Assigned User:</strong> {task.assignedUser}</p>
            <p ><strong>Priority:</strong> {task.priority}</p>
            <p ><strong>Status:</strong> {task.status}</p>
            <div >
                <button onClick={onEdit}>Edit</button>
                <button  onClick={onDelete}>Delete</button>
            </div>
        </div>
    );
};

export default TaskCard;
