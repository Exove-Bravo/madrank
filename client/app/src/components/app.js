import React from 'react';
import io from 'socket.io-client';

import Players from './players.js';
import Ranking from './ranking';
import Profile from './profile.js';

const socket    = io('http://localhost:3001');

const PLAYERS   = 1;
const RANKING   = 2;
const PROFILE   = 3;

export default class App extends React.Component {
    constructor(props) {
        super(props);

        // Set initial data to empty
        // on players and ranking
        this.state = {
            players: {},
            ranking: {},
            profile: {},
        };
    }

    componentDidMount() {
        // When the component is mounted, we can
        // setup the socket listener functions
        this.setupSocketListeners();
    }

    setupSocketListeners() {
        // Some longging when connected and disconnected
        socket.on('connect', data => {
            console.log('Socket connected');
        });

        socket.on("disconnect", data => {
            console.log('Socket disconnected');
        });

        // When we receive 'data' packet
        // check the 'op' variable an decide
        // based on that which variable we want to update
        socket.on("data", data => {
            switch(data.op) {
                case PLAYERS:
                    this.setState({ players: data.json });
                    break;
                case RANKING:
                    this.setState({ statistics: data.json});
                    break;
                case PROFILE:
                    this.setState({ profile: data.json});
                    break;
                default:
                    console.log('Unrecognized OP code.');
                    console.log(data);
                    break;
            }

        });
    }

    render() {
        // Read the variables to this context, so
        // we can use them inside return function without hassle
        let players = this.state.players;
        let ranking = this.state.ranking;
        let profile = this.state.profile;

        return (
            <div className="mainView">
                <div className="playerView">
                    <Players data={players}/>
                </div>
                <div className="rankingView">
                    <Ranking data={ranking}/>
                </div>
                <div className="profileView">
                    <Profile data={profile}/>
                </div>
                <div className="controlsView">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}