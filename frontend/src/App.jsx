import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import { io } from 'socket.io-client';
import PartyRoom from './pages/PartyRoom';

const socket = io(import.meta.env.VITE_BACKEND_URL);

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/party-room" element={<PartyRoom />} />
      </Routes>
    </Router>
  );
}

export default App;
