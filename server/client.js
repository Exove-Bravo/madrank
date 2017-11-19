class Client {
    constructor() {
        this.socket = null;
    }

    setSocket(socket) {
        this.socket = socket
    }

    getSocket() {
        return this.socket;
    }

    setupListeners() {
        // Set test data with OP 1 (PLAYERS) to client
        // and pass some name : position values
        this.socket.emit('data', {
            op: 1,
            json: [
                {name: 'pekka', position: 1},
                {name: 'marko', position: 2},
                {name: 'kalle', position: 2}
            ]
        });
    }
}

module.exports = Client;