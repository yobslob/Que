import React, { useState } from "react";
import axios from "axios";

const SongSuggestion = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/search-song?query=${query}`);
            setResults(response.data.tracks);
        } catch (error) {
            console.error("Error searching songs:", error);
        }
    };

    const suggestSong = async (songId) => {
        try {
            await axios.post("http://localhost:5000/suggest-song", { songId });
            alert("Song suggested successfully!");
        } catch (error) {
            console.error("Error suggesting song:", error);
        }
    };

    return (
        <div style={{ padding: "20px", textAlign: "center" }}>
            <h3>Suggest a Song</h3>
            <input
                type="text"
                placeholder="Search for a song"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{ marginRight: "10px" }}
            />
            <button onClick={handleSearch}>Search</button>

            <div>
                {results.map((song) => (
                    <div key={song.id} style={{ margin: "10px 0" }}>
                        <span>
                            {song.name} by {song.artists[0].name}
                        </span>
                        <button onClick={() => suggestSong(song.id)} style={{ marginLeft: "10px" }}>
                            Suggest
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SongSuggestion;
