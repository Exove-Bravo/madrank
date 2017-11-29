import React from 'react';
import _ from 'lodash';

export default class Match extends React.Component {
    constructor(props) {
        super (props);

        this.state = {
            winner: 'none',
            challenger: 'none',
            submit: false
        };
    }

    handlePlayerChange(id, event) {
        let value = event.target.value;

        if (_.isEmpty(value)) {
            this.setState({submit: false});
            return;
        }

        switch (id) {
            case 'winner':
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
        event.preventDefault();
        console.log("submit");
    }

    render() {
        let disableSubmit = !(this.state.winner !== 'none' && this.state.challenger !== 'none');
        let playerList = [];

        if (!_.isEmpty(this.props.players)) {
            playerList = this.props.players.map(function(object, i){
                return(
                    <option className={"row"} key={i} value={object.name}>
                        {object.name}
                    </option>
                )
            });
        }

        return (
            <div>
                <h3>Add new Match</h3>
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