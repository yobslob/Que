## frontend
├── public/<br>
│   ├── index.html    &emsp;&emsp;# Main HTML file<br>
│   └── favicon.ico   &emsp;&emsp;# Favicon<br>
├── src/<br>
│   ├── assets/       &emsp;&emsp;# Images, fonts, etc.<br>
│   ├── components/   &emsp;&emsp;# Reusable components<br>
│   │   ├── Header.jsx<br>
│   │   ├── Party.jsx<br>
│   │   ├── SongSuggestion.jsx<br>
│   │   └── VotingGraph.jsx<br>
│   ├── pages/       &emsp;&emsp; # Page components<br>
│   │   ├── Home.jsx<br>
│   │   └── PartyRoom.jsx<br>
│   ├── services/     &emsp;&emsp;# API calls<br>
│   │   ├── spotifyService.js<br>
│   │   └── partyService.js<br>
│   ├── App.jsx       &emsp;&emsp;# Main app component<br>
│   ├── main.jsx      &emsp;&emsp;# Entry point for React<br>
│   └── index.css     &emsp;&emsp;# Global styles<br>
├── .env              &emsp;&emsp;# Environment variables<br>
├── package.json      &emsp;&emsp;# Dependencies<br>
├── vite.config.js    &emsp;&emsp;# Vite configuration<br>
└── README.md         &emsp;&emsp;# Project details<br>
## Backend
├── src/<br>
│   ├── controllers/      &emsp;&emsp; # Logic for handling routes<br>
│   │   ├── partyController.js<br>
│   │   ├── songController.js<br>
│   │   └── spotifyController.js<br>
│   ├── models/            &emsp;&emsp;# Database models<br>
│   │   ├── Party.js<br>
│   │   ├── Song.js<br>
│   │   └── Vote.js<br>
│   ├── routes/            &emsp;&emsp;# API route definitions<br>
│   │   ├── partyRoutes.js<br>
│   │   ├── songRoutes.js<br>
│   │   └── spotifyRoutes.js<br>
│   ├── utils/             &emsp;&emsp;# Utility functions<br>
│   │   ├── generatePartyCode.js<br>
│   │   └── spotifyAuth.js<br>
│   ├── config/            &emsp;&emsp;# Configuration files<br>
│   │   ├── db.js          &emsp;&emsp;# Database connection<br>
│   │   └── dotenv.js      &emsp;&emsp;# Loads environment variables<br>
│   ├── app.js             &emsp;&emsp;# Initializes the Express app<br>
│   └── server.js          &emsp;&emsp;# Server entry point<br>
├── .env                   &emsp;&emsp;# Environment variables<br>
├── package.json           &emsp;&emsp;# Dependencies<br>
├── README.md              &emsp;&emsp;# Project details<br>
└── nodemon.json           &emsp;&emsp;# Nodemon config for development<br>
