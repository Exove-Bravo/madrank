import React from 'react';

import {socketListener} from '../lib/io.js';

import Players from './players.js';
import Ranking from './ranking';
import Profile from './profile.js';
import Controllers from './controllers.js';

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

        // When we receive 'data' packet
        // check the 'op' variable an decide
        // based on that which variable we want to update
        socketListener(data => {
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
                    <Controllers players={players}/>
                </div>
            </div>
        );
    }
}