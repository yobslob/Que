import React, { useState, useEffect } from "react";

const VotingGraph = () => {
    const [votes, setVotes] = useState([]);

    useEffect(() => {
        const fetchVotes = async () => {
            try {
                const response = await fetch("http://localhost:5000/votes");
                const data = await response.json();
                setVotes(data);
            } catch (error) {
                console.error("Error fetching votes:", error);
            }
        };

        fetchVotes();
    }, []);

    return (
        <div style={{ padding: "20px", textAlign: "center" }}>
            <h3>Voting Results</h3>
            <div style={{ maxWidth: "600px", margin: "0 auto" }}>
                {votes.map((song) => (
                    <div key={song.id} style={{ marginBottom: "10px" }}>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: "5px",
                            }}
                        >
                            <span>{song.name}</span>
                            <span>{song.votes} votes</span>
                        </div>
                        <div
                            style={{
                                height: "20px",
                                background: "#ddd",
                                borderRadius: "5px",
                                overflow: "hidden",
                            }}
                        >
                            <div
                                style={{
                                    width: `${song.votes}%`,
                                    height: "100%",
                                    background: "#4caf50",
                                }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VotingGraph;
