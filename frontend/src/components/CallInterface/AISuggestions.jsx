import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext.jsx';
import { AlertCircle, CheckCircle, Copy, AlertTriangle } from 'lucide-react';

const AISuggestions = () => {
    const { currentPrediction, suggestions } = useAppContext();
    const [copied, setCopied] = useState(null);
    const [visibleSuggestion, setVisibleSuggestion] = useState(null);
    const [isAnimating, setIsAnimating] = useState(false);

    // Effect to fade suggestions in and out
    useEffect(() => {
        if (suggestions.length > 0) {
            // Select a random suggestion to show initially
            const randomIndex = Math.floor(Math.random() * suggestions.length);
            setVisibleSuggestion(suggestions[randomIndex]);

            // Set up a timer to rotate suggestions
            const timer = setInterval(() => {
                // Start fade out animation
                setIsAnimating(true);

                // After fade out completes, change the suggestion
                setTimeout(() => {
                    const nextIndex = Math.floor(Math.random() * suggestions.length);
                    setVisibleSuggestion(suggestions[nextIndex]);

                    // Start fade in animation
                    setIsAnimating(false);
                }, 1000);
            }, 8000);

            return () => clearInterval(timer);
        }
    }, [suggestions]);

    const handleCopySuggestion = (text) => {
        navigator.clipboard.writeText(text);
        setCopied(text);
        setTimeout(() => setCopied(null), 2000);
    };

    const renderRiskLevel = () => {
        if (!currentPrediction) return null;

        const { scamProbability } = currentPrediction;
        let color, label, icon;

        if (scamProbability > 0.7) {
            color = 'bg-red-100 text-red-800';
            label = 'High Risk';
            icon = <AlertCircle size={16} className="text-red-600" />;
        } else if (scamProbability > 0.4) {
            color = 'bg-yellow-100 text-yellow-800';
            label = 'Medium Risk';
            icon = <AlertTriangle size={16} className="text-yellow-600" />;
        } else {
            color = 'bg-green-100 text-green-800';
            label = 'Low Risk';
            icon = <CheckCircle size={16} className="text-green-600" />;
        }

        return (
            <div className={`flex items-center space-x-2 px-3 py-2 rounded-full ${color} w-fit mb-4`}>
                {icon}
                <span className="font-medium text-sm">{label} - {(scamProbability * 100).toFixed(1)}%</span>
            </div>
        );
    };

    return (
        <div className="h-full flex flex-col">
            <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">AI Assistant</h2>
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
                {!currentPrediction ? (
                    <div className="h-full flex items-center justify-center text-gray-400">
                        <p>AI analysis will appear here during the call</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {renderRiskLevel()}

                        <div>
                            <h3 className="text-sm font-medium text-gray-700 mb-2">Analysis</h3>
                            <p className="text-sm text-gray-600">{currentPrediction.analysis}</p>

                            <div className="mt-2 bg-gray-100 rounded p-2">
                                <div className="text-xs text-gray-500">Scam Probability</div>
                                <div className="flex items-center mt-1">
                                    <div className="h-2 flex-1 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-red-500"
                                            style={{ width: `${currentPrediction.scamProbability * 100}%` }}
                                        ></div>
                                    </div>
                                    <span className="ml-2 text-sm font-medium">
                                        {(currentPrediction.scamProbability * 100).toFixed(1)}%
                                    </span>
                                </div>

                                <div className="text-xs text-gray-500 mt-2">Non-Scam Probability</div>
                                <div className="flex items-center mt-1">
                                    <div className="h-2 flex-1 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-green-500"
                                            style={{ width: `${currentPrediction.nonScamProbability * 100}%` }}
                                        ></div>
                                    </div>
                                    <span className="ml-2 text-sm font-medium">
                                        {(currentPrediction.nonScamProbability * 100).toFixed(1)}%
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-medium text-gray-700 mb-2">Suggested Responses</h3>

                            {/* Animated suggestion display */}
                            <div className="h-24 flex items-center justify-center">
                                {visibleSuggestion ? (
                                    <div
                                        className={`p-3 bg-white border border-gray-200 rounded-md shadow-sm transition-opacity duration-1000 ${isAnimating ? 'opacity-0' : 'opacity-100'
                                            }`}
                                    >
                                        <p className="text-sm">{visibleSuggestion}</p>
                                        <button
                                            onClick={() => handleCopySuggestion(visibleSuggestion)}
                                            className="mt-2 flex items-center text-xs text-indigo-600 hover:text-indigo-800"
                                        >
                                            <Copy size={14} className="mr-1" />
                                            {copied === visibleSuggestion ? 'Copied!' : 'Copy to use'}
                                        </button>
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-400 italic">Loading suggestions...</p>
                                )}
                            </div>

                            <div className="mt-6">
                                <h4 className="text-xs font-medium text-gray-500 mb-2">All Suggestions</h4>
                                <div className="space-y-2">
                                    {suggestions.map((suggestion, index) => (
                                        <div
                                            key={index}
                                            className="p-2 bg-gray-50 border border-gray-200 rounded-md text-xs"
                                        >
                                            {suggestion}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AISuggestions;