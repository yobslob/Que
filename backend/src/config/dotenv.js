const dotenv = require('dotenv');

const loadEnv = () => {
    const result = dotenv.config();
    if (result.error) {
        console.error("Failed to load .env file", result.error);
        process.exit(1);
    }

    console.log("Environment variables loaded successfully");
};

module.exports = loadEnv;
