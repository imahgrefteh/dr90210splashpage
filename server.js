var express = require('express');
var app = express();
var path = require('path');



app.use("/css", express.static(__dirname + '/css'));
app.use("/fonts", express.static(__dirname + '/fonts'));
app.use("/images", express.static(__dirname + '/images'));
app.use("/js", express.static(__dirname + '/js'));

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    console.log('_dirname',__dirname);
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(8080);