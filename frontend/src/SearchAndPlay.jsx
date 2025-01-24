import React, { useState } from 'react';
import axios from 'axios';

const SearchAndPlay = ({ accessToken, deviceId }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query.trim() === '') {
            setSearchResults([]);
            return;
        }

        try {
            const response = await axios.get('https://api.spotify.com/v1/search', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                params: {
                    q: query,
                    type: 'track',
                    limit: 5,
                },
            });

            setSearchResults(response.data.tracks.items);
        } catch (error) {
            console.error('Error searching:', error);
        }
    };

    const handlePlaySong = async (uri) => {
        if (!deviceId) {
            console.error('Device ID is missing');
            return;
        }

        try {
            await axios.put(
                'https://api.spotify.com/v1/me/player/play',
                {
                    uris: [uri],
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    params: {
                        device_id: deviceId,
                    },
                }
            );
        } catch (error) {
            console.error('Error playing song:', error);
        }
    };

    const handleClearSearch = () => {
        setSearchQuery('');
        setSearchResults([]);
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <div style={{ position: 'relative', width: '300px', margin: '0 auto' }}>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearch}
                    placeholder="Search for a song..."
                    style={{
                        width: '100%',
                        padding: '10px',
                        border: '1px solid #ccc',
                        borderRadius: '20px',
                        paddingRight: '30px', // For space for the cross button
                    }}
                />
                {searchQuery && (
                    <button
                        onClick={handleClearSearch}
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '96%',
                            transform: 'translateY(-50%)',
                            background: 'none',
                            color: '#909090',
                            border: 'none',
                            cursor: 'pointer',
                        }}
                    >
                        clear
                    </button>
                )}
            </div>

            {searchResults.length > 0 && (
                <div style={{ marginTop: '10px', textAlign: 'left', width: '300px', margin: '10px auto' }}>
                    {searchResults.map((track) => (
                        <div
                            key={track.id}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '10px',
                                borderBottom: '1px solid #eee',
                                cursor: 'pointer',
                            }}
                            onClick={() => handlePlaySong(track.uri)}
                        >
                            <img
                                src={track.album.images[2]?.url}
                                alt={track.name}
                                style={{ width: '40px', height: '40px', borderRadius: '5px', marginRight: '10px' }}
                            />
                            <div>
                                <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{track.name}</div>
                                <div style={{ fontSize: '12px', color: '#555' }}>
                                    {track.artists.map((artist) => artist.name).join(', ')}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchAndPlay;
