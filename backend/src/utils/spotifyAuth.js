// backend/utils/spotifyAuth.js

const SpotifyWebApi = require('spotify-web-api-node');

// Initialize the Spotify API client with credentials
const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: process.env.SPOTIFY_REDIRECT_URI,
});

// Function to generate the Spotify authorization URL
function getSpotifyAuthUrl(state) {
    const scopes = [
        "user-read-playback-state",
        "user-modify-playback-state",
        "user-read-currently-playing",
        "streaming",
    ];

    return spotifyApi.createAuthorizeURL(scopes, state);
}

// Function to exchange authorization code for an access token
async function getAccessToken(code) {
    try {
        const data = await spotifyApi.authorizationCodeGrant(code);
        const { access_token, refresh_token, expires_in } = data.body;

        // Set tokens in the Spotify API client for future requests
        spotifyApi.setAccessToken(access_token);
        spotifyApi.setRefreshToken(refresh_token);

        return { access_token, refresh_token, expires_in };
    } catch (error) {
        console.error("Error exchanging authorization code:", error.message);
        throw error;
    }
}

// Function to refresh the access token using the refresh token
async function refreshAccessToken() {
    try {
        const data = await spotifyApi.refreshAccessToken();
        const { access_token, expires_in } = data.body;

        // Update the Spotify API client with the new token
        spotifyApi.setAccessToken(access_token);

        return { access_token, expires_in };
    } catch (error) {
        console.error("Error refreshing access token:", error.message);
        throw error;
    }
}

module.exports = {
    spotifyApi, // Exporting the initialized Spotify API instance
    getSpotifyAuthUrl,
    getAccessToken,
    refreshAccessToken,
};
