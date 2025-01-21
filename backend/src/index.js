const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');
const partyRoutes = require('./routes/partyRoutes');
const songRoutes = require('./routes/songRoutes');
const spotifyRoutes = require('./routes/spotifyRoutes');

// Initialize dotenv and load environment variables
dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1);
    }
};
connectDB();

// Setup Express application
const app = express();
app.use(cors());
app.use(express.json());

// Setup API Routes
app.use('/api/party', partyRoutes);
app.use('/api/song', songRoutes);
app.use('/api/spotify', spotifyRoutes);

// Setup Home route
app.get('/', (req, res) => {
    res.send("Welcome to Que API");
});

// In-memory storage for parties (consider replacing with a database in production)
const parties = {};

// Create HTTP server and setup Socket.IO
const server = http.createServer(app);

// Setup Socket.IO for real-time updates
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle party updates in real-time
    socket.on('join-party', (code) => {
        socket.join(code);
        console.log(`User joined party: ${code}`);
    });

    socket.on('suggest-song', ({ code, song }) => {
        if (parties[code]) {
            parties[code].songs.push(song);
            io.to(code).emit('song-suggested', parties[code].songs);
        }
    });

    socket.on('vote-song', ({ code, songId }) => {
        if (parties[code] && parties[code].votes[songId]) {
            parties[code].votes[songId] += 1;
            io.to(code).emit('vote-updated', parties[code].votes);
        }
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Get the port from environment variables
const port = process.env.PORT || 5000;  // Default to 5000 if not set in .env

// Start the server
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});