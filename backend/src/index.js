const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = 'http://localhost:5000/callback';

let accessToken = '';
let refreshToken = '';

// Spotify API helper function to refresh the access token
const refreshAccessToken = async () => {
    try {
        const response = await axios.post(
            'https://accounts.spotify.com/api/token',
            new URLSearchParams({
                grant_type: 'refresh_token',
                refresh_token: refreshToken,
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
            }),
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        );
        accessToken = response.data.access_token;
    } catch (error) {
        console.error('Error refreshing access token:', error.response?.data || error.message);
    }
};

// Step 1: Login route
app.get('/login', (req, res) => {
    const scopes = 'user-read-currently-playing user-read-playback-state streaming';
    const spotifyAuthURL = `https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}&scope=${scopes}&redirect_uri=${REDIRECT_URI}`;
    res.redirect(spotifyAuthURL);
});

// Step 2: Handle Spotify callback
app.get('/callback', async (req, res) => {
    const code = req.query.code;

    try {
        const tokenResponse = await axios.post(
            'https://accounts.spotify.com/api/token',
            new URLSearchParams({
                grant_type: 'authorization_code',
                code,
                redirect_uri: REDIRECT_URI,
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
            }),
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        );

        accessToken = tokenResponse.data.access_token;
        refreshToken = tokenResponse.data.refresh_token;

        res.redirect(`http://localhost:5173?accessToken=${accessToken}`);
    } catch (error) {
        console.error('Error fetching token:', error.response?.data || error.message);
        res.status(500).send('Authentication failed.');
    }
});

// Step 3: Fetch the currently playing track
app.get('/api/current-track', async (req, res) => {
    try {
        const response = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching current track:', error.response?.data || error.message);
        res.status(500).send('Failed to fetch current track.');
    }
});

// Search for tracks
app.get('/api/search', async (req, res) => {
    const query = req.query.q;
    if (!query) return res.status(400).send('Search query is required.');

    try {
        const response = await axios.get('https://api.spotify.com/v1/search', {
            headers: { Authorization: `Bearer ${accessToken}` },
            params: { q: query, type: 'track', limit: 10 },
        });

        const tracks = response.data.tracks.items.map((track) => ({
            name: track.name,
            artists: track.artists.map((artist) => artist.name).join(', '),
            uri: track.uri,
            album: track.album.name,
            cover: track.album.images[0]?.url,
        }));

        res.json(tracks);
    } catch (error) {
        console.error('Error searching tracks:', error.response?.data || error.message);
        if (error.response?.status === 401) {
            await refreshAccessToken();
            return res.status(401).send('Access token refreshed. Please try again.');
        }
        res.status(500).send('Failed to search tracks.');
    }
});

// Play a track
app.put('/api/play', async (req, res) => {
    const { deviceId, trackUri } = req.body;

    if (!deviceId || !trackUri) {
        return res.status(400).send('Missing device ID or track URI.');
    }

    try {
        await axios.put(
            'https://api.spotify.com/v1/me/player/play',
            { uris: [trackUri] },
            {
                headers: { Authorization: `Bearer ${accessToken}` },
                params: { device_id: deviceId },
            }
        );
        res.sendStatus(204);
    } catch (error) {
        console.error('Error playing track:', error.response?.data || error.message);
        if (error.response?.status === 401) {
            await refreshAccessToken();
            return res.status(401).send('Access token refreshed. Please try again.');
        }
        res.status(500).send('Failed to play track.');
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
