import io from 'socket.io-client';
import _ from 'lodash';

const socket    = io('http://localhost:3001');

const opcodes = {
    PLAYERS: 1,
    RANKING: 2,
    PROFILE: 3,
};

function socketListener(cb) {
    socket.on('data', cb);
}

function sendToSocket(event, data) {

    if(_.isEmpty(event)) {
        console.log('No event provided');
        return;
    }

    if(_.isEmpty(data)) {
        console.log('No data provided');
        return 1;
    }

    socket.emit(event, data);
}

export {socketListener, sendToSocket, opcodes};
