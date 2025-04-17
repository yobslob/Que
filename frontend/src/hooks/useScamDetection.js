import { useCallback } from 'react';
import { useAppContext } from '../context/AppContext.jsx';
import { analyzeConversation, getResponseSuggestions } from '../Services/api.js';

const useScamDetection = () => {
    const { addConversationEntry, setCurrentPrediction, setSuggestions } = useAppContext();

    const analyzeText = useCallback(async (fullConversation) => {
        if (!fullConversation || !fullConversation.trim()) return null;

        try {
            // Call the API to analyze the conversation
            const analysisResult = await analyzeConversation(fullConversation);

            // Update the current prediction state
            setCurrentPrediction({
                scamProbability: analysisResult.scamProbability,
                nonScamProbability: analysisResult.nonScamProbability,
                analysis: analysisResult.analysis
            });

            // Get suggestions for response based on the last line and scam probability
            const lastLine = fullConversation.split('\n').filter(line => line.trim()).pop() || '';
            const suggestionsResult = await getResponseSuggestions(lastLine, analysisResult.scamProbability);
            setSuggestions(suggestionsResult);

            return analysisResult;
        } catch (error) {
            console.error('Error analyzing text:', error);
            return null;
        }
    }, [setCurrentPrediction, setSuggestions]);

    return { analyzeText };
};

export default useScamDetection;
