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
            <div className="container">

                <div className="header row">
                    <div className="col-xs-12 col-md-10">
                        <h1>MadRank</h1>
                    </div>
                    <div className="col-xs-6 col-md-2">Profile</div>
                </div>

                <div className="actions row">
                    <div className="col-xs-12 col-md-12 text-center">
                        <button id="singlebutton" name="singlebutton" className="btn btn-danger btn-lg">CHALLENGE <span><img src="images/equipment.png" alt="" className="img-rounded" width="32" /></span></button>
                    </div>
                </div>

                <div className="charts row">
                    <div className="col-xs-12 col-md-12">
                        <span><img src="images/charts.png" alt="" className="img-rounded" /></span>
                    </div>
                </div>

                <div className="content row">
                    <div className="col-xs-12 col-md-8">
                        <div className="upcoming row">
                            <h3>Upcoming Matches</h3>
                            <div className="row">
                                <span>Pekka Ihalinen</span>
                                <strong> VS </strong>
                                <span> Biswa Upreti</span>
                            </div>
                            <div className="row">
                                <span>Marko Räsänen </span>
                                <strong> VS </strong>
                                <span> Kalle Kipinä</span>
                            </div>
                        </div>
                        <div className="recent row">
                            <h3>Recent Matches</h3>
                            <div className="row">
                                <span className="text-success">Pekka Ihalinen </span>
                                <strong> VS </strong>
                                <span className="text-danger"> Biswa Upreti</span>
                            </div>
                        </div>
                    </div>
                    <div className="sidebar col-xs-6 col-md-4">
                        <h3>Challengers</h3>

                        <ul className="list-group">
                            <li className="list-group-item">
                                <span className="badge">
                                    <span className="label label-success">20 Wins</span> <span className="label label-info">25 Played</span>
                                </span>
                                Biswa Upreti <span className="glyphicon glyphicon-triangle-bottom"></span>
                            </li>
                            <li className="list-group-item">
                                <span className="badge">
                                    <span className="label label-success">20 Wins</span> <span className="label label-info">25 Played</span>
                                </span>
                                Pekka Ihalainen <span className="glyphicon glyphicon-triangle-top"></span>
                            </li>
                            <li className="list-group-item">
                                <span className="badge">
                                    <span className="label label-success">20 Wins</span> <span className="label label-info">25 Played</span>
                                </span>
                                Marko Räsänen <span className="glyphicon glyphicon-triangle-top"></span>
                            </li>
                            <li className="list-group-item">
                                <span className="badge">
                                    <span className="label label-success">20 Wins</span> <span className="label label-info">25 Played</span>
                                </span>
                                Kalle Kipinä <span className="glyphicon glyphicon-triangle-top"></span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}