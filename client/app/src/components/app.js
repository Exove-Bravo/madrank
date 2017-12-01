import React from 'react';
import io from 'socket.io-client';

import Players from './players.js';
import Ranking from './ranking';
import Profile from './profile.js';

import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Badge from 'material-ui/Badge';

//var BarChart = require('react-d3-basic').BarChart;

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    gridList: {
        width: 500,
        height: 640,
        overflowY: 'auto',
    },
};


const socket    = io('http://localhost:3001');

const PLAYERS   = 1;
const RANKING   = 2;
const PROFILE   = 3;

export default class App extends React.Component {
    constructor(props) {
        super(props);

        // Set initial data to empty
        // on players and ranking
        this.state = {
            players: [],
            ranking: {},
            profile: {},
        };

    }

    componentDidMount() {
        // When the component is mounted, we can
        // setup the socket listener functions
        this.setupSocketListeners();
    }

    setupSocketListeners() {
        // Some longging when connected and disconnected
        socket.on('connect', data => {
            console.log('Socket connected');
        });

        socket.on("disconnect", data => {
            console.log('Socket disconnected');
        });

        // When we receive 'data' packet
        // check the 'op' variable an decide
        // based on that which variable we want to update
        socket.on("data", data => {
            switch(data.op) {
                case PLAYERS:
                    this.setState({ players: data.json });
                    break;
                case RANKING:
                    this.setState({ statistics: data.json});
                    break;
                case PROFILE:
                    this.setState({ profile: data.json});
                    break;
                default:
                    console.log('Unrecognized OP code.');
                    console.log(data);
                    break;
            }

        });
    }

    render() {
        // Read the variables to this context, so
        // we can use them inside return function without hassle
        let playersData = this.state.players;
        let ranking = this.state.ranking;
        let profile = this.state.profile;

        return (
            <div style={styles.root}>
                <GridList cellHeight={180} style={styles.gridList}>
                    <Subheader>MadRank. YaY! It's completely mad!</Subheader>
                    {playersData.map((player) => (
                        <GridTile
                            key={player.img}
                            title={<Badge badgeContent={player.position} primary={true}>{player.title}</Badge>}
                            actionIcon={<IconButton><StarBorder color="white" /></IconButton>}>

                            <img src={player.img} />
                        </GridTile>
                    ))}
                </GridList>
            </div>
            //<div className="mainView">
            //    <div className="playerView">
            //        <Players data={players}/>
            //    </div>
            //    <div className="rankingView">
            //        <Ranking data={ranking}/>
            //    </div>
            //    <div className="profileView">
            //        <Profile data={profile}/>
            //    </div>
            //    <div className="controlsView">
            //        <div>{/* status */}</div>
            //        <ol>{/* TODO */}</ol>
            //    </div>
            //</div>
        );
    }
}