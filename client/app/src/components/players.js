import React from 'react';
import _ from 'lodash';

export default class Players extends React.Component {
    render() {
        let playerList = "No players";

        if(!_.isEmpty(this.props.data)) {
            playerList = this.props.data.map(function(object, i){
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

