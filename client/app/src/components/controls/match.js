import React from 'react';
import _ from 'lodash';
import {socketListener, opcodes, sendToSocket} from "../../lib/io";

export default class Match extends React.Component {
    constructor(props) {
        super (props);

        this.state = {
            players: [],
            winner: 'none',
            challenger: 'none',
            submit: false,
            message: null
        };
    }

    componentDidMount() {

        // Setup IO data handler
        // We are only interested in player list
        socketListener(data => {
            switch(data.op) {
                case opcodes.PLAYERS:
                    this.setState({players: data.json});
                    break;
                default:
                    break;
            }
        });
    }

    handlePlayerChange(id, event) {
        let value = event.target.value;

        // If value is empty, disable submit button
        if (_.isEmpty(value)) {
            this.setState({submit: false});
            return;
        }

        // Checks which of the select boxes we changed the value
        // in
        switch (id) {
            case 'winner':
                // If winner is same as challenger, lets just
                // reset the value on a box and try again..
                // Space time wouldn't allow you to beat yourself
                if( this.state.challenger === value ) {
                    console.log("same");
                    this.setState({winner: 'none'});
                }
                else {
                    this.setState({winner: value});
                }
                break;
            case 'challenger':
                if( this.state.winner === value ) {
                    console.log("same");
                    this.setState({challenger: 'none'});
                }
                else {
                    this.setState({challenger: value});
                }
                break;
            default:
                break;
        }
    }

    handleSubmit(event) {
        // Lets not refresh the page
        event.preventDefault();

        // Create data package to server
        let json = {
            winner: this.state.winner,
            challenger: this.state.challenger,
            time: new Date().getTime()
        };

        sendToSocket('data', json);

        console.log('Match result send to socket.');

        // Reset the variables
        this.setState({message: 'Match added', winner: 'none', challenger: 'none'});
    }

    render() {
        // If either of the select boxes have no selection, submit button stays disabled
        let disableSubmit = !(this.state.winner !== 'none' && this.state.challenger !== 'none');
        let playerList = [];

        // Lets construct options list for select boxes
        if (!_.isEmpty(this.state.players)) {
            playerList = this.state.players.map(function(object, i){
                return(
                    <option className={"row"} key={i} value={object.name}>
                        {object.name}
                    </option>
                )
            });
        }
        else {
            // If we don't have players list available, request it from
            // the server
            sendToSocket('data', ({
                op: opcodes.PLAYERS,
                json: null
            }));
        }

        // Reference to message variable
        // since 'this' context gets fucked up
        // inside callback
        let message = this.state.message;

        let message_area = function() {
            // Print the message
            return (
                <div className={"message"}>
                    <p className={"messageText"}>
                        {message}
                    </p>
                </div>
            )
        };

        return (
            <div>
                <h3>Add new Match</h3>
                {(!_.isEmpty(this.state.message)) ? message_area() : null }

                <form onSubmit={this.handleSubmit.bind(this)}>
                    <label>
                        Winner
                        <select value={this.state.winner} onChange={this.handlePlayerChange.bind(this, "winner")}>
                            <option className={"row"} key={0} value={"none"}>
                                Select
                            </option>
                            {playerList}
                        </select>
                    </label>
                    <label>
                        Challenger
                        <select value={this.state.challenger} onChange={this.handlePlayerChange.bind(this, "challenger")}>
                            <option className={"row"} key={0} value={"none"}>
                                Select
                            </option>
                            {playerList}
                        </select>
                    </label>
                    <input type={"submit"} value={"Add result"} disabled={(disableSubmit)}/>
                </form>
            </div>
        );
    }
}