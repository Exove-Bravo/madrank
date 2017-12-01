
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

        this.socket.on('data', data => {
            switch (data.op) {
                case 1:
                    this.socket.emit('data', {
                        op: 1,
                        json: [
                            {name: 'pekka', position: 1},
                            {name: 'marko', position: 2},
                            {name: 'kalle', position: 3},
                            {name: 'Biswa', position: 4}
                        ]
                    });
                    break;
                case 3:
                    this.socket.emit('data', {
                        op: 3,
                        json: {
                            name: 'Mr/s. Your Name',
                            email: 'your.name@exove.com',
                            phone: '+358501234567',
                            position: 'Rock*'
                        }
                    });
                    break;
                default:
                    console.log("No implemented defined");
                    break;

            }
        });
    }
}

module.exports = Client;