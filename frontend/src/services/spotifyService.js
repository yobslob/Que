import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// Function to get the currently playing track
export const getCurrentTrack = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/api/spotify/current-track`);
        return response.data;
    } catch (error) {
        console.error("Error fetching current track:", error);
        throw error;
    }
};

// Function to search for tracks
export const searchTracks = async (query) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/spotify/search`, { query });
        return response.data;
    } catch (error) {
        console.error("Error searching tracks:", error);
        throw error;
    }
};

// Function to add a track to the playback queue
export const addToQueue = async (uri) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/spotify/add-to-queue`, { uri });
        return response.data;
    } catch (error) {
        console.error("Error adding track to queue:", error);
        throw error;
    }
};
