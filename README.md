## frontend
├── public/<br>
│   ├── index.html    # Main HTML file<br>
│   └── favicon.ico   # Favicon<br>
├── src/<br>
│   ├── assets/       # Images, fonts, etc.<br>
│   ├── components/   # Reusable components<br>
│   │   ├── Header.jsx<br>
│   │   ├── Party.jsx<br>
│   │   ├── SongSuggestion.jsx<br>
│   │   └── VotingGraph.jsx<br>
│   ├── pages/        # Page components<br>
│   │   ├── Home.jsx<br>
│   │   └── PartyRoom.jsx<br>
│   ├── services/     # API calls<br>
│   │   ├── spotifyService.js<br>
│   │   └── partyService.js<br>
│   ├── App.jsx       # Main app component<br>
│   ├── main.jsx      # Entry point for React<br>
│   └── index.css     # Global styles<br>
├── .env              # Environment variables<br>
├── package.json      # Dependencies<br>
├── vite.config.js    # Vite configuration<br>
└── README.md         # Project details<br>
## Backend
├── src/<br>
│   ├── controllers/       # Logic for handling routes<br>
│   │   ├── partyController.js<br>
│   │   ├── songController.js<br>
│   │   └── spotifyController.js<br>
│   ├── models/            # Database models<br>
│   │   ├── Party.js<br>
│   │   ├── Song.js<br>
│   │   └── Vote.js<br>
│   ├── routes/            # API route definitions<br>
│   │   ├── partyRoutes.js<br>
│   │   ├── songRoutes.js<br>
│   │   └── spotifyRoutes.js<br>
│   ├── utils/             # Utility functions<br>
│   │   ├── generatePartyCode.js<br>
│   │   └── spotifyAuth.js<br>
│   ├── config/            # Configuration files<br>
│   │   ├── db.js          # Database connection<br>
│   │   └── dotenv.js      # Loads environment variables<br>
│   ├── app.js             # Initializes the Express app<br>
│   └── server.js          # Server entry point<br>
├── .env                   # Environment variables<br>
├── package.json           # Dependencies<br>
├── README.md              # Project details<br>
└── nodemon.json           # Nodemon config for development<br>
