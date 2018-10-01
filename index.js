var port = 3700;

var path = require('path');
var express = require('express');
var app = express();
var http = require('http');
var server = http.Server(app);
var io = require('socket.io')(server);

//static files
app.use(express.static('public'));


app.get('/', function(req, res){
  res.sendFile(path.join(__dirname + '/index.html'));
});


io.on('connection', function(socket){

    socket.on('deviceOrientation', function(data){	//listen to socket
  	  io.emit('gyroscope', data); //sends to all connected devices
    });
	
    socket.on('deviceMotion', function(data){	//listen to socket
  	  io.emit('accelerometer', data); //sends to all connected devices
    });
  
  
});

server.listen(port, function(){
  console.log('Express server listening on port ' + port);
});

