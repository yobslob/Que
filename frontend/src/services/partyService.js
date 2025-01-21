import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// Function to create a new party
export const createParty = async (code) => {
    try {
        console.log({ BASE_URL });
        const response = await axios.post(`${BASE_URL}/api/party/create-party`, { code });
        return response.data;
    } catch (error) {
        console.error("Error creating party:", error);
        throw error;
    }
};

// Function to join an existing party
export const joinParty = async (code) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/party/join-party`, { code });
        return response.data;
    } catch (error) {
        console.error("Error joining party:", error);
        throw error;
    }
};
