import { useState, useEffect, useRef } from 'react';

const useVoiceRecognition = () => {
    const [transcript, setTranscript] = useState('');
    const [finalTranscript, setFinalTranscript] = useState('');
    const [recognition, setRecognition] = useState(null);
    const [speakerIndex, setSpeakerIndex] = useState(1);
    const [fullConversation, setFullConversation] = useState('');

    // Use a ref to track if recognition is initialized to avoid multiple instances
    const recognitionInitialized = useRef(false);

    useEffect(() => {
        // Initialize speech recognition when component mounts
        if (!recognitionInitialized.current && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognitionInstance = new SpeechRecognition();

            recognitionInstance.continuous = true;
            recognitionInstance.interimResults = false;

            recognitionInstance.onresult = (event) => {
                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        const text = event.results[i][0].transcript.trim();
                        const labeled = `Speaker ${speakerIndex}: ${text}`;

                        // Update current transcript
                        setTranscript(text);
                        setFinalTranscript(labeled);

                        // Add to full conversation
                        const updatedConversation = fullConversation + labeled + '\n';
                        setFullConversation(updatedConversation);

                        // Alternate speakers for next entry
                        setSpeakerIndex(speakerIndex === 1 ? 2 : 1);

                        return updatedConversation;
                    }
                }
            };

            recognitionInstance.onerror = (event) => {
                console.error('Speech recognition error', event.error);
            };

            setRecognition(recognitionInstance);
            recognitionInitialized.current = true;
        }

        // Cleanup function
        return () => {
            if (recognition) {
                try {
                    recognition.stop();
                } catch (e) {
                    // Ignore errors when stopping
                }
            }
        };
    }, [speakerIndex, fullConversation]);

    const startListening = () => {
        if (recognition) {
            try {
                recognition.start();
            } catch (e) {
                console.error('Error starting speech recognition', e);
            }
        }
    };

    const stopListening = () => {
        if (recognition) {
            try {
                recognition.stop();
            } catch (e) {
                console.error('Error stopping speech recognition', e);
            }
        }
    };

    const resetTranscript = () => {
        setTranscript('');
        setFinalTranscript('');
        setFullConversation('');
        setSpeakerIndex(1);
    };

    return {
        transcript,
        finalTranscript,
        fullConversation,
        speakerIndex,
        resetTranscript,
        startListening,
        stopListening,
        isSupported: !!recognition
    };
};

export default useVoiceRecognition;
