import io from 'socket.io-client';

const socket    = io('http://localhost:3001');

function socketListener(cb) {
    socket.on('data', cb);
}

export {socketListener};
