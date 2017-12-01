import React from 'react';

import {socketListener} from '../lib/io.js';

import Players from './players.js';
import Ranking from './ranking';
import Profile from './profile.js';
import Controllers from './controllers.js';


export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="mainView">
                <div className="playerView">
                    <Players/>
                </div>
                <div className="rankingView">
                    <Ranking/>
                </div>
                <div className="profileView">
                    <Profile/>
                </div>
                <div className="controlsView">
                    <Controllers />
                </div>
            </div>
        );
    }
}