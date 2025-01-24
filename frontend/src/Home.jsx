import React, { useEffect, useState } from 'react';
import SearchAndPlay from './SearchAndPlay';

const Home = () => {
    const [accessToken, setAccessToken] = useState(null);
    const [player, setPlayer] = useState(null);
    const [deviceId, setDeviceId] = useState(null);
    const [playerState, setPlayerState] = useState(null);
    const [progress, setProgress] = useState(0); // Progress in milliseconds
    const [isPaused, setIsPaused] = useState(true);

    const handleLogout = () => {
        localStorage.removeItem('spotifyAccessToken'); // Clear the token from localStorage
        setAccessToken(null); // Clear the token from the state
        if (player) {
            player.disconnect(); // Disconnect Spotify player if it's initialized
        }
    };
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('accessToken');
        if (token) {
            setAccessToken(token);
            localStorage.setItem('spotifyAccessToken', token);
            params.delete('accessToken');
            window.history.replaceState({}, document.title, `${window.location.pathname}`);
        } else {
            const storedToken = localStorage.getItem('spotifyAccessToken');
            if (storedToken) setAccessToken(storedToken);
        }
    }, []);

    useEffect(() => {
        window.onSpotifyWebPlaybackSDKReady = () => {
            initializePlayer();
        };

        const loadSpotifySDK = () => {
            if (!window.Spotify) {
                const script = document.createElement('script');
                script.src = 'https://sdk.scdn.co/spotify-player.js';
                script.async = true;
                document.body.appendChild(script);
            } else {
                initializePlayer();
            }
        };

        const initializePlayer = () => {
            if (accessToken && window.Spotify) {
                const spotifyPlayer = new window.Spotify.Player({
                    name: 'Web Playback SDK',
                    getOAuthToken: cb => cb(accessToken),
                    volume: 0.5,
                });

                spotifyPlayer.addListener('ready', ({ device_id }) => {
                    console.log('Ready with Device ID:', device_id);
                    setDeviceId(device_id); // Store deviceId for playback
                    transferPlayback(device_id);
                });

                spotifyPlayer.addListener('player_state_changed', (state) => {
                    console.log('Player state changed:', state);
                    if (state) {
                        setPlayerState(state);
                        setProgress(state.position);
                        setIsPaused(state.paused);
                    }
                });

                spotifyPlayer.connect().then(success => {
                    if (success) console.log('Connected to Spotify Player');
                });

                setPlayer(spotifyPlayer);
            }
        };


        const transferPlayback = async (deviceId) => {
            await fetch('https://api.spotify.com/v1/me/player', {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ device_ids: [deviceId], play: true }),
            });
        };

        if (accessToken) {
            loadSpotifySDK();
        }
    }, [accessToken]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (!isPaused && playerState) {
                setProgress((prevProgress) => Math.min(prevProgress + 1000, playerState.duration));
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [isPaused, playerState]);

    const formatTime = (ms) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = ((ms % 60000) / 1000).toFixed(0);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <h1>Spotify Player</h1>
            {!accessToken ? (
                <button
                    onClick={() => (window.location.href = 'http://localhost:5000/login')}
                    style={{ padding: '10px 20px', margin: '10px' }}
                >
                    Log in to Spotify
                </button>
            ) : playerState ? (
                <div style={{ marginTop: '20px' }}>
                    <div>
                        <img
                            src={playerState.track_window.current_track.album.images[0]?.url}
                            alt={playerState.track_window.current_track.name}
                            style={{ width: '200px', borderRadius: '10px' }}
                        />
                        <h3>{playerState.track_window.current_track.name}</h3>
                        <p>
                            <strong>Artists:</strong>{' '}
                            {playerState.track_window.current_track.artists.map((artist) => artist.name).join(', ')}
                        </p>
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: '20px',
                        }}
                    >
                        <div style={{ margin: '0 15px' }}>
                            <img
                                src={isPaused ? '/play.png' : '/pause.png'}
                                alt="Play/Pause"
                                style={{ width: '30px', cursor: 'pointer' }}
                                onClick={() => {
                                    if (player) {
                                        isPaused ? player.resume() : player.pause();
                                    }
                                }}
                            />
                        </div>
                    </div>

                    <div style={{ marginTop: '20px', width: '80%', marginLeft: '10%' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                            <span>{formatTime(progress)}</span>
                            <span>{formatTime(playerState.duration)}</span>
                        </div>
                        <div
                            style={{
                                height: '10px',
                                background: '#ddd',
                                borderRadius: '5px',
                                overflow: 'hidden',
                                position: 'relative',
                            }}
                        >
                            <div
                                style={{
                                    height: '100%',
                                    width: `${(progress / playerState.duration) * 100}%`,
                                    background: '#1db954',
                                    transition: 'width 0.1s linear',
                                }}
                            ></div>
                        </div>
                    </div>
                    {/* Logout Button */}
                    <button
                        onClick={handleLogout}
                        style={{ padding: '10px 20px', margin: '10px', backgroundColor: '#f44336', color: 'white' }}
                    >
                        Logout
                    </button>

                </div>

            ) : (
                <p>Loading player state...</p>
            )}
            {/* Pass accessToken and deviceId to SearchAndPlay */}
            <SearchAndPlay accessToken={accessToken} deviceId={deviceId} />
        </div>
    );
};

export default Home;
