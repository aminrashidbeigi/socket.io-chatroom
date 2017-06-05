var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var hostname = 'localhost';
var port = 3000;

app.get ('/' , function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    io.emit('chat message', 'a user connected');
    var name;
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
        name = msg.split(" ")[0];
    });

    socket.on('is typing', function(msg){
        console.log(msg);
        io.emit('is typing', msg);
    });

    socket.on('disconnect', function(){
        io.emit('chat message', name + ' disconnected');
    });
});

http.listen(3000, function(){
    console.log('server is running at port 3000');
});
