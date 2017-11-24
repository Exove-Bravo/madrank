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
                {name: 'kalle', position: 3},
                {name: 'Biswa', position: 4}
            ]
        });

        this.socket.emit('data', {
            op: 3,
            json: {
                name: 'Mr/s. Your Name',
                email: 'your.name@exove.com',
                phone: '+358501234567',
                position: 'Rock*'
            }
        });
    }
}

module.exports = Client;