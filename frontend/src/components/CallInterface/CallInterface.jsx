import React, { useEffect, useState } from 'react';
import MicButton from './MicButton.jsx';
import ConversationDisplay from './ConversationDisplay.jsx';
import AISuggestions from './AISuggestions.jsx';
import { useAppContext } from '../../context/AppContext.jsx';
import useVoiceRecognition from '../../hooks/useVoiceRecognition.js';
import useScamDetection from '../../hooks/useScamDetection.js';

const CallInterface = () => {
    const { isRecording, setIsRecording, addConversationEntry, clearConversation } = useAppContext();
    const {
        finalTranscript,
        fullConversation,
        resetTranscript,
        startListening,
        stopListening
    } = useVoiceRecognition();
    const { analyzeText } = useScamDetection();
    const [lastAnalyzedText, setLastAnalyzedText] = useState('');

    // Process new transcript entries and analyze the conversation
    useEffect(() => {
        if (finalTranscript && finalTranscript !== lastAnalyzedText) {
            // Add new entry to conversation display
            addConversationEntry(finalTranscript);

            // Analyze updated conversation
            analyzeText(fullConversation);

            // Mark this transcript as processed
            setLastAnalyzedText(finalTranscript);
        }
    }, [finalTranscript, fullConversation, addConversationEntry, analyzeText, lastAnalyzedText]);

    const handleMicToggle = () => {
        if (isRecording) {
            stopListening();
        } else {
            startListening();
        }
        setIsRecording(!isRecording);
    };

    const handleClearConversation = () => {
        clearConversation();
        resetTranscript();
    };

    return (
        <div className="h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-gray-800">Scam Call Detection</h1>
                <div className="flex space-x-2">
                    <button
                        onClick={handleClearConversation}
                        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-sm font-medium text-gray-700"
                    >
                        Clear Conversation
                    </button>
                </div>
            </div>

            <div className="flex-1 flex overflow-hidden rounded-lg shadow-lg bg-white">
                {/* 70% conversation area */}
                <div className="w-7/10 flex flex-col border-r border-gray-200">
                    <ConversationDisplay />
                    <div className="p-4 border-t border-gray-200 flex justify-center">
                        <MicButton isRecording={isRecording} onClick={handleMicToggle} />
                        <div className="ml-4 text-sm text-gray-500 self-center">
                            {isRecording ? 'Listening...' : 'Click to start'}
                        </div>
                    </div>
                </div>

                {/* 30% AI suggestions area */}
                <div className="w-3/10 bg-gray-50">
                    <AISuggestions />
                </div>
            </div>
        </div>
    );
};

export default CallInterface;
