require('dotenv').config()

module.exports = {
    MONGO_URI: process.env.MONGO_URI,   
    MONGO_URL: process.env.MONGO_URL, 
    PORT: process.env.PORT,
}