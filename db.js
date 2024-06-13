const mongoose = require('mongoose');

// Define the MongoDB connection Url

const mongoURL = 'mongodb://localhost:27017/mydatabase'; // set url for connection

// set up of connection of mongodb

mongoose.connect(mongoURL,{
    useNewUrlParser: true,           // Required parameters for making Connection with mongodb
    useUnifiedTopology:true          // Required parameters for making Connection with mongodb
})

// Get the default connection
// Mongoose maintailns a default connection object representing the MongoDB connection.

const db = mongoose.connection;

//Define Event listner for database connection 

db.on('connected', () => {
    console.log("Connected to the MongoDB Server");
});

db.on('error', (err) => {
    console.log("MongoDB Connection error", err);
});

db.on('disconnected', () => {
    console.log("MongoDB Server is Disconnected");
});

// Export the database connection

module.exports = db;