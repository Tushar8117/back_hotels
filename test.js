const express = require('express');

const app = express();

const db = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json()); // req-body




app.get('/', function (req, res) {
    res.send("Hello Welcome to here");
});




// Person export from PersonRoutes
const personRoutes = require('./Routes/personRoutes');
app.use('/person', personRoutes);

// Menu export from MenuItemsRoutes
const MenuItemsRoutes = require('./Routes/menuItemsRoutes');
app.use('/menu', MenuItemsRoutes);

app.listen(3000, () => {
    console.log("Server is listening on port 3000")
});