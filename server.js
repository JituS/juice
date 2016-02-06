var http = require('http');
var express = require('express');
var app = express();
app.use(express.static('./'));
http.createServer(app).listen(8080);