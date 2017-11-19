import io from 'socket.io-client';

const socket = io('http://localhost:3001');

function eventHandler(cb) {
    socket.on('timer', timestamp => cb(null, timestamp));
    socket.emit('subscribeToTimer', 1000);
}
export {eventHandler};