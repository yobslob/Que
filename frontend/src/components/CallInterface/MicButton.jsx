import React from 'react';
import { Mic, MicOff } from 'lucide-react';

const MicButton = ({ isRecording, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`w-16 h-16 rounded-full flex items-center justify-center shadow-md transition-colors ${isRecording
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                }`}
            aria-label={isRecording ? 'Stop recording' : 'Start recording'}
        >
            {isRecording ? <MicOff size={24} /> : <Mic size={24} />}
        </button>
    );
};

export default MicButton;