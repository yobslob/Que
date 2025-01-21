import React, { useEffect, useState } from "react";
import { getCurrentTrack } from "../services/spotifyService";

const Party = () => {
    const [currentSong, setCurrentSong] = useState(null);

    useEffect(() => {
        const fetchCurrentTrack = async () => {
            try {
                const response = await getCurrentTrack();
                setCurrentSong(response.track);
            } catch (error) {
                console.error("Error fetching current track:", error);
            }
        };

        fetchCurrentTrack();
    }, []);

    return (
        <div style={{ padding: "20px", textAlign: "center" }}>
            <h2>Now Playing</h2>
            {currentSong ? (
                <div>
                    <p><strong>{currentSong.name}</strong> by {currentSong.artists}</p>
                    <p>Album: {currentSong.album}</p>
                    <img
                        src={currentSong.albumArt}
                        alt={currentSong.name}
                        style={{ width: "200px", height: "200px", objectFit: "cover" }}
                    />
                </div>
            ) : (
                <p>Loading current song...</p>
            )}
        </div>
    );
};

export default Party;
