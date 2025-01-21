import React, { useEffect, useState } from "react";
import axios from "axios";

const Party = () => {
    const [currentSong, setCurrentSong] = useState(null);

    useEffect(() => {
        const fetchCurrentSong = async () => {
            try {
                const response = await axios.get("http://localhost:5000/current-song");
                setCurrentSong(response.data);
            } catch (error) {
                console.error("Error fetching current song:", error);
            }
        };

        fetchCurrentSong();
    }, []);

    return (
        <div style={{ padding: "20px", textAlign: "center" }}>
            <h2>Now Playing</h2>
            {currentSong ? (
                <div>
                    <p><strong>{currentSong.name}</strong> by {currentSong.artist}</p>
                </div>
            ) : (
                <p>Loading current song...</p>
            )}
        </div>
    );
};

export default Party;
