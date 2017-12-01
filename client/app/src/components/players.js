import React from 'react';
import _ from 'lodash';


import {socketListener, opcodes} from '../lib/io.js';

export default class Players extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            players: null
        }
    }

    componentDidMount() {
        socketListener(data => {
            switch(data.op) {
                case opcodes.PLAYERS:
                    this.setState({players: data.json});
                    break;
                default:
                    break;
            }
        })
    }

    render() {

        // By default display 'No players'
        let playerList = "No players";

        // But if the data property is not empty, we have some data
        // from server..
        if(!_.isEmpty(this.state.players)) {

            // Use the map function to create keyd values from the array
            // and put each of the data element inside div and return the
            // whole structure to playerList variable
            playerList = this.state.players.map(function(object, i) {
                return <div className={"row"} key={i}>
                    {[object.name , object.position]}
                </div>;
            });
        }

        return (
            <div>
                <h3>Players</h3>
                <h4>{playerList}</h4>
            </div>
        );
    }
}

