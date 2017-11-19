let app = require('express')();
let server = require('http').Server(app);
let io = require('socket.io')(server);
let Client = require('./client.js');

// Create empty list of clients
let clientList = new Array();


server.listen(3001);

// Initial socket listener
io.on('connection', function (socket) {

    // Tell server log which user connected
    console.log('New user connected [' + socket.id + '].');

    // Add 'disconnect' listener to socket on server level so we can
    // access the clientList easier
    socket.on('disconnect', function(data) {
        console.log('User disconnected [' + socket.id + '].');

        // Upon disconnection, remove this client from clietList
        clientList = clientList.filter(s => {
            return s.getSocket().id !== socket.id
        });

        // Announce server
        announceServer();
    });

    // When new client connects, create 'client' object
    let client = new Client();

    // Add the socket to client object so we can do stuff
    // with it.
    client.setSocket(socket);

    // Setup rest of socket.io event listeners
    client.setupListeners();


    // Add object to list of clients
    clientList.push(client);

    // Announce server
    announceServer();
});

function announceServer() {
    console.log('Currently total of ' + clientList.length + " users online.");
}