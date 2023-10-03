require('dotenv').config();

module.exports = {
    mongoURI: process.env.MONGO_URL,
    secretOrKey: "secret"
};