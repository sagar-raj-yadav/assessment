import React, { useState, useEffect } from 'react';
import TaskSection from './TaskSection';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TaskBoard = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('All');  // Selected status
    const [selectedPriority, setSelectedPriority] = useState('All');
    const [assignedUser, setAssignedUser] = useState('All');
    const [tasks, setTasks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [limit] = useState(10);  

    const fetchTasks = async (page = 1) => {
        try {
            const queryStatus = selectedStatus === 'All' ? '' : `status=${selectedStatus}`;
            const response = await axios.get(``);
            setTasks(response.data.tasks);
            setTotalPages(response.data.totalPages);
            setCurrentPage(response.data.currentPage);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    // Fetch tasks on component mount and when filters or page changes
    useEffect(() => {
        fetchTasks(currentPage);  // Fetch tasks initially and when filters or page change
    }, [selectedStatus, currentPage]);

    const addTask = (newTask) => {
        fetchTasks(currentPage);
    };

    // Filter tasks based on search, priority, and assigned user
    const filteredTasks = tasks.filter(task => {
        const matchesSearch = task.title ? task.title.toLowerCase().includes(searchTerm.toLowerCase()) : false;
        const matchesPriority = selectedPriority === 'All' || task.priority === selectedPriority;
        const matchesUser = assignedUser === 'All' || task.assignedUser === assignedUser;
        return matchesSearch && matchesPriority && matchesUser;
    });

    // Group tasks by status
    const tasksByStatus = {
        'ToDo': filteredTasks.filter(task => task.status === 'ToDo'),
        'InProgress': filteredTasks.filter(task => task.status === 'InProgress'),
        'Completed': filteredTasks.filter(task => task.status === 'Completed'),
    };

    // Pagination controls
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    //logout
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate("/login");
    };
    

    return (
        <>
            <div >
                <input
                    type="text"
                    placeholder="Search tasks by title..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select onChange={(e) => setSelectedStatus(e.target.value)} value={selectedStatus}>
                    <option value="All">All Statuses</option>
                    <option value="ToDo">To Do</option>
                    <option value="InProgress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
                <select onChange={(e) => setSelectedPriority(e.target.value)} value={selectedPriority}>
                    <option value="All">All Priorities</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
                <select onChange={(e) => setAssignedUser(e.target.value)} value={assignedUser}>
                    <option value="All">All Users</option>
                    <option value="User A">User A</option>
                    <option value="User B">User B</option>
                    <option value="User C">User C</option>
                </select>
            </div>
            <button  onClick={handleLogout}>logout</button>

            <div >
                <TaskSection title="ToDo" tasks={tasksByStatus['ToDo']} addTask={addTask} />
                <TaskSection title="InProgress" tasks={tasksByStatus['InProgress']} addTask={addTask} />
                <TaskSection title="Completed" tasks={tasksByStatus['Completed']} addTask={addTask} />
            </div>

            <div>
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>

        </>
    );
};

export default TaskBoard;
