import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import Party from "../components/Party";
import SongSuggestion from "../components/SongSuggestion";
import VotingGraph from "../components/VotingGraph";

const PartyRoom = () => {
    const location = useLocation();
    const { code } = location.state || {};

    useEffect(() => {
        const socket = io("http://localhost:5000");

        socket.emit("joinParty", code);

        socket.on("updateParty", (data) => {
            console.log("Party updated:", data);
        });

        return () => {
            socket.disconnect();
        };
    }, [code]);

    return (
        <div>
            <h2 style={{ textAlign: "center", marginTop: "20px" }}>
                Party Code: {code || "No Code Provided"}
            </h2>
            <Party />
            <SongSuggestion />
            <VotingGraph />
        </div>
    );
};

export default PartyRoom;
