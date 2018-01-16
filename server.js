var express = require('express');
var bodyParser = require("body-parser"); // process post request
var path = require('path');


var app = express();
//TODO: look into making this better? 


//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//configure to see stuff on website. 
app.use("/css", express.static(__dirname + '/css'));
app.use("/fonts", express.static(__dirname + '/fonts'));
app.use("/images", express.static(__dirname + '/images'));
app.use("/js", express.static(__dirname + '/js'));


app.post('/sendemail', function (req, res) {
    var emailAddress = req.body.emailAddress;
    console.log("emailAddress",emailAddress);
    res.end("yes");
});


// viewed at http://localhost:8080
app.get('/', function (req, res) {
    console.log('_dirname', __dirname);
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(8080);