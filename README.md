## frontend
├── public/<br>
│   ├── index.html    &nbsp;&nbsp;# Main HTML file<br>
│   └── favicon.ico   &nbsp;&nbsp;# Favicon<br>
├── src/<br>
│   ├── assets/       &nbsp;&nbsp;# Images, fonts, etc.<br>
│   ├── components/   &nbsp;&nbsp;# Reusable components<br>
│   │   ├── Header.jsx<br>
│   │   ├── Party.jsx<br>
│   │   ├── SongSuggestion.jsx<br>
│   │   └── VotingGraph.jsx<br>
│   ├── pages/       &nbsp;&nbsp; # Page components<br>
│   │   ├── Home.jsx<br>
│   │   └── PartyRoom.jsx<br>
│   ├── services/     &nbsp;&nbsp;# API calls<br>
│   │   ├── spotifyService.js<br>
│   │   └── partyService.js<br>
│   ├── App.jsx       &nbsp;&nbsp;# Main app component<br>
│   ├── main.jsx      &nbsp;&nbsp;# Entry point for React<br>
│   └── index.css     &nbsp;&nbsp;# Global styles<br>
├── .env              &nbsp;&nbsp;# Environment variables<br>
├── package.json      &nbsp;&nbsp;# Dependencies<br>
├── vite.config.js    &nbsp;&nbsp;# Vite configuration<br>
└── README.md         &nbsp;&nbsp;# Project details<br>
## Backend
├── src/<br>
│   ├── controllers/      &nbsp;&nbsp; # Logic for handling routes<br>
│   │   ├── partyController.js<br>
│   │   ├── songController.js<br>
│   │   └── spotifyController.js<br>
│   ├── models/            &nbsp;&nbsp;# Database models<br>
│   │   ├── Party.js<br>
│   │   ├── Song.js<br>
│   │   └── Vote.js<br>
│   ├── routes/            &nbsp;&nbsp;# API route definitions<br>
│   │   ├── partyRoutes.js<br>
│   │   ├── songRoutes.js<br>
│   │   └── spotifyRoutes.js<br>
│   ├── utils/             &nbsp;&nbsp;# Utility functions<br>
│   │   ├── generatePartyCode.js<br>
│   │   └── spotifyAuth.js<br>
│   ├── config/            &nbsp;&nbsp;# Configuration files<br>
│   │   ├── db.js          &nbsp;&nbsp;# Database connection<br>
│   │   └── dotenv.js      &nbsp;&nbsp;# Loads environment variables<br>
│   ├── app.js             &nbsp;&nbsp;# Initializes the Express app<br>
│   └── server.js          &nbsp;&nbsp;# Server entry point<br>
├── .env                   &nbsp;&nbsp;# Environment variables<br>
├── package.json           &nbsp;&nbsp;# Dependencies<br>
├── README.md              &nbsp;&nbsp;# Project details<br>
└── nodemon.json           &nbsp;&nbsp;# Nodemon config for development<br>
