import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";

const Home = () => {
    const [partyCode, setPartyCode] = useState("");
    const [joinCode, setJoinCode] = useState("");
    const navigate = useNavigate();

    // Connect to the Socket.IO server
    const socket = io("http://localhost:5000");

    // Generate random code and send it to the server
    const handleCreateParty = async () => {
        const randomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
        setPartyCode(randomCode);

        try {
            const response = await axios.post("http://localhost:5000/api/party/create-party", {
                code: randomCode,
            });
            console.log(response.data.message);
            socket.emit("joinParty", randomCode); // Emit event for party creation
            navigate("/party-room", { state: { code: randomCode } });
        } catch (error) {
            console.error("Error creating party:", error);
        }
    };

    // Join party with code
    const handleJoinParty = async () => {
        if (!joinCode) return alert("Please enter a valid code!");

        try {
            const response = await axios.post("http://localhost:5000/api/party/join-party", {
                code: joinCode,
            });
            console.log(response.data.message);
            socket.emit("joinParty", joinCode); // Emit event for joining party
            navigate("/party-room", { state: { code: joinCode } });
        } catch (error) {
            console.error("Error joining party:", error);
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Welcome to Silent Disco</h1>
            <button onClick={handleCreateParty}>Create Party</button>
            {partyCode && <p>Party Code: {partyCode}</p>}

            <div style={{ marginTop: "20px" }}>
                <input
                    type="text"
                    placeholder="Enter Party Code"
                    value={joinCode}
                    onChange={(e) => setJoinCode(e.target.value)}
                />
                <button onClick={handleJoinParty}>Join Party</button>
            </div>
        </div>
    );
};

export default Home;
