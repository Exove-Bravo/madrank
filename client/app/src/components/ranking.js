import React from 'react';
import _ from 'lodash';

export default class Ranking extends React.Component {
    render() {
        let ranking = "No ranking data";

        if(!_.isEmpty(this.props.data)) {
            // something
        }

        return (
            <div>
                <h3>Ranking</h3>
                <h4>Print ranking component</h4>
            </div>
        );
    }
}

