import React, { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import TaskBoard from './components/TaskBoard';
import Login from './loginsignup/Login';
import Signup from './loginsignup/Signup';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    const router = createBrowserRouter([
        {
            path: "/signup",
            element: <Signup />,
        },
        {
            path: "/login",
            element: <Login onLogin={handleLogin} />,
        },
        {
            path: "/",
            element: isAuthenticated ? <TaskBoard /> : <Navigate to="/login" />,
        },
    ]);

    return (
        <RouterProvider router={router} />
    );
};

export default App;
