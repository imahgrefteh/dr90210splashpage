var express = require('express');
var bodyParser = require("body-parser"); // process post request
var nodemailer = require('nodemailer');
var path = require('path');
var config = require('./config'); //my config files. 

var app = express();


//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//configure to see stuff on website. 
app.use("/css", express.static(__dirname + '/css'));
app.use("/fonts", express.static(__dirname + '/fonts'));
app.use("/images", express.static(__dirname + '/images'));
app.use("/js", express.static(__dirname + '/js'));


var transporter = nodemailer.createTransport({
    //TODO: https://stackoverflow.com/a/5870544/1177645
    service: 'gmail',
    auth: {
        user: config.gmail.user_name ,
        pass: ''
    }
});


app.post('/sendemail', function (req, res) {
    var emailAddress = req.body.emailAddress;
    var mailOptions = {
        from: 'youremail@gmail.com',
        to: emailAddress,
        subject: 'Hey someone wants to get newsletter informaiton',
        text: 'That was easy! This is a test from the website'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
});


// viewed at http://localhost:8080
app.get('/', function (req, res) {
    console.log('_dirname', __dirname);
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(8080);