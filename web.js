var app = require('./app');
var debug = require('debug')('ExmapleEJS:server');
var http = require('http');


/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '80');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);
var io = require('socket.io').listen(server);
/*socket.io*/
var numUsers = 0;
var chatUsers = {};
io.on('connection', function(socket) {
    var addedUser = false;
    socket.leave(socket.id);
    // when the client emits 'new message', this listens and executes
    socket.on('new message', function(data) {
        // we tell the client to execute 'new message'
        socket.broadcast.to(socket.channel).emit('new message', {
            username: socket.username,
            message: data
        });
    });

    // when the client emits 'add user', this listens and executes
    socket.on('add user', function(username, channel, roomname) {
        if (addedUser) return;

        // we store the username in the socket session for this client
        socket.join(channel);
        if(roomname)io.sockets.adapter.rooms[channel].name = roomname;
        console.log(io.sockets.adapter.rooms);
        socket.channel = channel;
        socket.username = username;
        ++numUsers;
        if(!chatUsers[channel]) chatUsers[channel] = [];
        chatUsers[channel].push(username);
        addedUser = true;
        socket.emit('login', {
            numUsers: chatUsers[channel].length,
            users: chatUsers[channel]
        });
        // echo globally (all clients) that a person has connected
        socket.broadcast.to(socket.channel).emit('user joined', {
            username: socket.username,
            numUsers: chatUsers[channel].length,
            users: chatUsers[channel]
        });

    });

    socket.on('get room list', function() {
        socket.emit('room list', io.sockets.adapter.rooms);
    });

    // when the client emits 'typing', we broadcast it to others
    socket.on('typing', function() {
        socket.broadcast.to(socket.channel).emit('typing', {
            username: socket.username
        });
    });

    // when the client emits 'stop typing', we broadcast it to others
    socket.on('stop typing', function() {
        socket.broadcast.to(socket.channel).emit('stop typing', {
            username: socket.username
        });
    });

    // when the user disconnects.. perform this
    socket.on('disconnect', function() {
        if (addedUser) {
            socket.leave(socket.channel);
            --numUsers;
            chatUsers[socket.channel].splice(chatUsers[socket.channel].indexOf(socket.username), 1);

            // echo globally that this client has left
            socket.broadcast.to(socket.channel).emit('user left', {
                username: socket.username,
                numUsers: chatUsers[socket.channel].length,
                users: chatUsers[socket.channel]
            });
        }
    });
});

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port, function() {
    console.log('Express Server가 80번 포트에서 시작되었습니다. ^^');
});
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string' ?
        'Pipe ' + port :
        'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string' ?
        'pipe ' + addr :
        'port ' + addr.port;
    debug('Listening on ' + bind);
}
