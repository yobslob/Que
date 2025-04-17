const API_BASE_URL = 'http://localhost:5000'; // Change this to match your Flask server address

export const analyzeConversation = async (conversation) => {
    try {
        // Make API call to Flask backend using the full conversation history
        const response = await fetch(`${API_BASE_URL}/classify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                conversation: conversation
            })
        });

        console.log(response);

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();

        // Create analysis text based on the probability
        let analysisText = "";
        if (data.scam_probability > 0.7) {
            analysisText = "High risk of scam detected. Be cautious about sharing any personal information.";
        } else if (data.scam_probability > 0.4) {
            analysisText = "Medium risk detected. Proceed with caution and verify caller's identity.";
        } else {
            analysisText = "Low risk detected. This conversation appears legitimate based on current analysis.";
        }

        return {
            scamProbability: data.scam_probability,
            nonScamProbability: data.non_scam_probability,
            analysis: analysisText
        };
    } catch (error) {
        console.error('Error calling classification API:', error);
        throw error;
    }
};

export const getResponseSuggestions = async (text, scamProbability) => {
    // Generate response suggestions based on scam probability
    if (scamProbability > 0.7) {
        return [
            "I don't provide personal information over the phone.",
            "Can you verify which company you're calling from?",
            "I'll need to call you back on your official number.",
            "I don't feel comfortable sharing that information."
        ];
    } else if (scamProbability > 0.4) {
        return [
            "Could you explain why you need this information?",
            "I'd like to confirm your identity first.",
            "Can you provide more details about your request?",
            "Let me think about that and get back to you."
        ];
    } else {
        return [
            "Thank you for the information.",
            "Can you explain more about what you're offering?",
            "What are the next steps in this process?",
            "That sounds reasonable, please continue."
        ];
    }
};

export const fetchCallHistory = async () => {
    // Mock data for call history since this endpoint doesn't exist in the Flask backend yet
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    id: '1',
                    timestamp: new Date(Date.now() - 86400000).toISOString(),
                    scamProbability: 0.92,
                    summary: 'Caller requested banking information'
                },
                {
                    id: '2',
                    timestamp: new Date(Date.now() - 172800000).toISOString(),
                    scamProbability: 0.15,
                    summary: 'Customer service call about recent purchase'
                },
                {
                    id: '3',
                    timestamp: new Date(Date.now() - 345600000).toISOString(),
                    scamProbability: 0.78,
                    summary: 'Caller claimed to be from IRS'
                }
            ]);
        }, 1000);
    });
};

export const updateSettings = async (settings) => {
    // Mock endpoint for settings since this doesn't exist in the Flask backend yet
    console.log('Updating settings:', settings);

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ success: true });
        }, 800);
    });
};