var express = require('express');
var bodyParser = require("body-parser"); // process post request
var Mailgun = require('mailgun-js');
var path = require('path');
var config = require('./config'); //my config files. 

var app = express();
console.log('MAKE SURE YOU ARE NOT USING VERSION 4');
console.log('config', config);

///mail-gun keys////////////// 
const api_key = config.mailgun.api_key;
const domain = config.mailgun.domain;
const from_who = config.mailgun.from_who;
const send_to = config.mailgun.send_to;
const MAILING_LIST = 'newsletter@doc90210.com';
////END of mail gun keys//////

app.set('view engine', 'jade');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//configure to see stuff on website. 
app.use("/css", express.static(__dirname + '/css'));
app.use("/fonts", express.static(__dirname + '/fonts'));
app.use("/images", express.static(__dirname + '/images'));
app.use("/js", express.static(__dirname + '/js'));

var mailgun = new Mailgun({apiKey: api_key, domain: domain});
app.post('/newsletter', function (req, res) {
    var customerEmail = req.body.emailAddress;
    console.log('req.body.emailAddress', customerEmail);
    var data = {
        from: from_who,
        to: send_to,
        subject: customerEmail + " wants news letter",
        html: customerEmail
    };
    mailgun.messages().send(data, function (err, body) {
        if (err) {
            res.send(err);
            console.log('got an error', err);
        } else {
            console.log('body', body);
            res.send(addToMailingList(customerEmail));
        }
    });

});


function addToMailingList(customerEmail) {
    var members = [
        {
            address: customerEmail
        }
    ];

    mailgun.lists(MAILING_LIST).members().add({members: members, subscribed: true}, function (err, body) {
        console.log(body);
        if (err) {
            return "Error : " + err;
        }
        else {
            return "success";
        }
    });
}


app.post('/moreinfo', function (req, res) {

    var body = {
        name: req.body.name,
        email: req.body.emailAddress,
        phone: req.body.phone,
        message: req.body.message
    };

    var data = {
        from: from_who,
        to: send_to,
        subject: body.name + " wants more info",
        html: JSON.stringify(body)
    };
    mailgun.messages().send(data, function (err, body) {
        if (err) {
            res.send(err);
            console.log('got an error', err);
        } else {
            res.send(body);
            console.log('body', body);
        }
    });
});


// viewed at http://localhost:8080
app.get('/', function (req, res) {
    console.log('_dirname', __dirname);
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(config.web.port);