require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');

const connectDB = require('./config/db');
connectDB();

// cors policy
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});



app.use(express.json());

// setup static files
// using app.use to serve up static CSS files in public/css/ folder
//  when /public link is called in ejs files
// app.use("/route", express.static("foldername"));
app.use('/public', express.static('public'));

//template engine
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');


// Routes 
// to upload file use this route
app.use('/api/files', require('./routes/files'));

// when file is uploaded it returns this route
app.use('/files', require('./routes/show'));


// to download file use this route
app.use('/files/download', require('./routes/download'));


app.listen(PORT, console.log(`Listening on port ${PORT}.`));