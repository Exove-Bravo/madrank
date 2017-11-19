import React from 'react';
import _ from 'lodash';

export default class Players extends React.Component {
    render() {

        // By default display 'No players'
        let playerList = "No players";

        // But if the data property is not empty, we have some data
        // from server..
        if(!_.isEmpty(this.props.data)) {

            // Use the map function to create keyd values from the array
            // and put each of the data element inside div and return the
            // whole structure to playerList variable
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

