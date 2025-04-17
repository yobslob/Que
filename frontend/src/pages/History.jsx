import React, { useState, useEffect } from 'react';
import { fetchCallHistory } from '../Services/api.js';

const History = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadHistory = async () => {
            try {
                const data = await fetchCallHistory();
                setHistory(data);
            } catch (error) {
                console.error('Failed to load call history:', error);
            } finally {
                setLoading(false);
            }
        };

        loadHistory();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Call History</h1>
            {history.length === 0 ? (
                <div className="text-center py-10">
                    <p className="text-gray-500">No call history available</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {history.map((call) => (
                        <div key={call.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm text-gray-500">{new Date(call.timestamp).toLocaleString()}</span>
                                <span className={`px-2 py-1 rounded-full text-xs ${call.scamProbability > 0.7 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                                    }`}>
                                    {call.scamProbability > 0.7 ? 'High Risk' : 'Low Risk'}
                                </span>
                            </div>
                            <h3 className="font-medium">Call #{call.id}</h3>
                            <p className="text-sm text-gray-600 mt-1">Scam probability: {(call.scamProbability * 100).toFixed(1)}%</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default History;