import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
    const [isRecording, setIsRecording] = useState(false);
    const [conversation, setConversation] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [currentPrediction, setCurrentPrediction] = useState(null);

    const addConversationEntry = (entry) => {
        // Entry format expected: "Speaker X: text"
        const parts = entry.split(':');

        if (parts.length >= 2) {
            const speaker = parts[0].trim();
            const text = parts.slice(1).join(':').trim();
            const isUser = speaker.includes('1'); // Speaker 1 is the user in your script

            setConversation(prev => [...prev, {
                text,
                isUser,
                speaker,
                timestamp: new Date()
            }]);
        }
    };

    const addSuggestion = (suggestion) => {
        setSuggestions(prev => [...prev, suggestion]);
    };

    const clearConversation = () => {
        setConversation([]);
        setSuggestions([]);
        setCurrentPrediction(null);
    };

    return (
        <AppContext.Provider value={{
            isRecording,
            setIsRecording,
            conversation,
            addConversationEntry,
            clearConversation,
            suggestions,
            addSuggestion,
            setSuggestions,
            currentPrediction,
            setCurrentPrediction
        }}>
            {children}
        </AppContext.Provider>
    );
};