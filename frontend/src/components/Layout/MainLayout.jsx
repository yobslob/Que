import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navigation/Navbar.jsx';

const MainLayout = () => {
    return (
        <div className="flex flex-col h-screen bg-gray-50">
            <Navbar />
            <main className="flex-1 overflow-hidden">
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;