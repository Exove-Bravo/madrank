import React from 'react';
import _ from 'lodash';

export default class Profile extends React.Component {
    render() {

        // Default one
        let profile = "Not available!";

        // But if the data property is not empty, we have some data
        // from server..
        if(!_.isEmpty(this.props.data)) {
            profile = this.props.data;

            // Use the map function to create keyd values from the array
            // and put each of the data element inside div and return the
            // whole structure to playerList variable
            //profile = this.props.data.map(function(object, i){
            //    return <div className={"row"} key={i}>
            //        {[object.name , object.email, object.phone, object.position]}
            //    </div>;
            //});
        }

        return (
            <div class="container">
                <h3>Your Profile</h3>
                <div class="row">
                    <span>Name: </span>
                    <span>{profile.name}</span>
                </div>
                <div class="row">
                    <span>Email: </span>
                    <span>{profile.email}</span>
                </div>
                <div class="row">
                    <span>Phone: </span>
                    <span>{profile.phone}</span>
                </div>
                <div class="row">
                    <span>Position: </span>
                    <span>{profile.position }</span>
                </div>
            </div>
        );
    }
}

