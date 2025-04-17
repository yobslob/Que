import React, { useEffect, useRef } from 'react';
import { useAppContext } from '../../context/AppContext.jsx';

const ConversationDisplay = () => {
    const { conversation, isRecording } = useAppContext();
    const containerRef = useRef(null);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [conversation]);

    return (
        <div ref={containerRef} className="flex-1 p-4 overflow-y-auto space-y-4">
            {conversation.length === 0 ? (
                <div className="h-full flex items-center justify-center text-gray-400">
                    <p>{isRecording ? 'Speak now...' : 'Start a call by clicking the microphone button below'}</p>
                </div>
            ) : (
                <>
                    {conversation.map((entry, index) => (
                        <div
                            key={index}
                            className={`max-w-3/4 p-3 rounded-lg ${entry.isUser
                                ? 'bg-indigo-100 ml-auto'
                                : 'bg-gray-100'
                                }`}
                        >
                            <div className="text-xs font-medium text-gray-500 mb-1">
                                {entry.speaker}
                            </div>
                            <p>{entry.text}</p>
                            <span className="text-xs text-gray-500 mt-1 block">
                                {new Date(entry.timestamp).toLocaleTimeString()}
                            </span>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
};

export default ConversationDisplay;