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
                {
                    img: 'images/players/pekka.jpg',
                    title: 'Pekka',
                    position: 100,
                },
                {
                    img: 'images/players/marko.jpg',
                    title: 'Marko',
                    position: 95,
                },
                {
                    img: 'images/players/kalle.jpg',
                    title: 'Kalle',
                    position: 90,
                },
                {
                    img: 'images/players/biswa.jpg',
                    title: 'Biswa',
                    position: 90,
                },
                {
                    img: 'images/players/no-picture.jpg',
                    title: 'Antti',
                    position: 100,
                },
                {
                    img: 'images/players/vadim.jpg',
                    title: 'Vadim',
                    position: 100,
                },
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