var express = require('express');
var bodyParser = require("body-parser"); // process post request
var nodemailer = require('nodemailer');
var path = require('path');
var config = require('./config'); //my config files. 

var app = express();
console.log('MAKE SURE YOU ARE NOT USING VERSION 4');
console.log('config', config);
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//configure to see stuff on website. 
app.use("/css", express.static(__dirname + '/css'));
app.use("/fonts", express.static(__dirname + '/fonts'));
app.use("/images", express.static(__dirname + '/images'));
app.use("/js", express.static(__dirname + '/js'));


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.gmail.user_name,
        pass: config.gmail.password
    }
});

//TODO:rename to newsletter
app.post('/sendemail', function (req, res) {
    var emailAddress = req.body.emailAddress;
    var mailOptions = {
        from: 'youremail@gmail.com',
        to: config.gmail.to,
        subject: 'Hey! ' + emailAddress + ' wants newsletter information',
        text: emailAddress
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.send(error);
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Email sent: ' + info.response);
        }
    });
});


app.post('/moreinfo', function (req, res) {
    var emailAddress = req.body.emailAddress;
    var name = req.body.name;
    var body = {
            Name: req.body.name,
            Email: emailAddress,
            phone: req.body.phone,
            message: req.body.message
    };

    var mailOptions = {
        from: 'youremail@gmail.com',
        to: 'mjghods@gmail.com',
        subject: "Hey! " + name + " has some Q's for you",
        text: JSON.stringify(body)
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.send(error);
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Email sent: ' + info.response);
        }
    });
});


// viewed at http://localhost:8080
app.get('/', function (req, res) {
    console.log('_dirname', __dirname);
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(config.web.port);