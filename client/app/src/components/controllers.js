import React from 'react';
import Tournament from './controls/tournament.js';
import Match from './controls/match.js';

export default class Controllers extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            addTournament: false,
            addMatch: false,
        };
    }

    tournamentButtonHandler() {
        if(this.state.addMatch) {
            this.setState({addMatch: false});
        }

        this.setState({addTournament: !this.state.addTournament});
    }

    matchButtonHandler() {
        if(this.state.addTournament) {
            this.setState({addTournament: false});
        }

        this.setState({addMatch: !this.state.addMatch});
    }

    render() {
        let showTournament = this.state.addTournament;
        let showMatch = this.state.addMatch;

        return (
            <div>
                <div className="controls">
                    <button onClick={this.tournamentButtonHandler.bind(this)}>Add tournament</button>
                    <button onClick={this.matchButtonHandler.bind(this)}>Add match</button>
                </div>
                <div className="controls-modal">
                    {showTournament ? <Tournament/> : null}
                    {showMatch ? <Match/> : null}
                </div>
            </div>
        );
    }
}

