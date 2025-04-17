import React, { useState } from 'react';
import { updateSettings } from '../Services/api.js';

const Settings = () => {
    const [settings, setSettings] = useState({
        enableNotifications: true,
        autoRecordCalls: false,
        sensitivityLevel: 'medium'
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSettings(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateSettings(settings);
            alert('Settings updated successfully');
        } catch (error) {
            console.error('Failed to update settings:', error);
            alert('Failed to update settings');
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Settings</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-white shadow-sm rounded-lg p-6">
                    <h2 className="text-lg font-medium mb-4">Notification Preferences</h2>
                    <div className="flex items-center justify-between">
                        <label htmlFor="enableNotifications" className="font-medium text-gray-700">
                            Enable notifications
                        </label>
                        <div className="relative inline-block w-10 mr-2 align-middle select-none">
                            <input
                                type="checkbox"
                                name="enableNotifications"
                                id="enableNotifications"
                                checked={settings.enableNotifications}
                                onChange={handleChange}
                                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                            />
                            <label
                                htmlFor="enableNotifications"
                                className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${settings.enableNotifications ? 'bg-indigo-500' : 'bg-gray-300'
                                    }`}
                            ></label>
                        </div>
                    </div>
                </div>

                <div className="bg-white shadow-sm rounded-lg p-6">
                    <h2 className="text-lg font-medium mb-4">Call Settings</h2>
                    <div className="flex items-center justify-between mb-4">
                        <label htmlFor="autoRecordCalls" className="font-medium text-gray-700">
                            Auto-record calls
                        </label>
                        <div className="relative inline-block w-10 mr-2 align-middle select-none">
                            <input
                                type="checkbox"
                                name="autoRecordCalls"
                                id="autoRecordCalls"
                                checked={settings.autoRecordCalls}
                                onChange={handleChange}
                                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                            />
                            <label
                                htmlFor="autoRecordCalls"
                                className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${settings.autoRecordCalls ? 'bg-indigo-500' : 'bg-gray-300'
                                    }`}
                            ></label>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="sensitivityLevel" className="block text-sm font-medium text-gray-700 mb-2">
                            Scam detection sensitivity
                        </label>
                        <select
                            id="sensitivityLevel"
                            name="sensitivityLevel"
                            value={settings.sensitivityLevel}
                            onChange={handleChange}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Save Settings
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Settings;