import React from 'react';
import io from 'socket.io-client';

import Players from './players.js';
import Ranking from './ranking';

const socket    = io('http://localhost:3001');

const PLAYERS   = 1;
const RANKING   = 2;

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            players: {},
            ranking: {}
        };
    }

    componentDidMount() {
        this.setupSocketListeners();
    }

    setupSocketListeners() {
        socket.on('connect', data => {
            console.log('Socket connected');
        });

        socket.on("disconnect", data => {
            console.log('Socket disconnected');
        });

        socket.on("data", data => {
            switch(data.op) {
                case PLAYERS:
                    this.setState({ players: data.json });
                    break;
                case RANKING:
                    this.setState({ statistics: data.json});
                    break;
                default:
                    console.log('Unrecognized OP code.');
                    console.log(data);
                    break;
            }

        });
    }

    render() {
        let players = this.state.players;
        let ranking = this.state.ranking;

        return (
            <div className="mainView">
                <div className="playerView">
                    <Players data={players}/>
                </div>
                <div className="rankingView">
                    <Ranking data={ranking}/>
                </div>
                <div className="controlsView">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}