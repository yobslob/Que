import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Clock, Settings } from 'lucide-react';

const Navbar = () => {
    const location = useLocation();

    const navItems = [
        { path: '/', label: 'Call Detection', icon: <Phone size={20} /> },
        { path: '/history', label: 'History', icon: <Clock size={20} /> },
        { path: '/settings', label: 'Settings', icon: <Settings size={20} /> }
    ];

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <span className="text-xl font-bold text-indigo-600">ScamGuard</span>
                    </div>
                    <div className="flex">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`inline-flex items-center px-4 h-16 border-b-2 text-sm font-medium ${location.pathname === item.path
                                        ? 'border-indigo-500 text-indigo-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                <span className="mr-2">{item.icon}</span>
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
