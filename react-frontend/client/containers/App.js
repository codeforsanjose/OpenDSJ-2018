import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { mapStateToProps } from '../redux/selectors/App';
import Navigation from './Navigation';
import MainContainer from './MainContainer';


import '../styles/app.scss';

class App extends Component {
    constructor(props) {
        super(props);

        // BEGIN: Select first campaign/election in list by default
        let selection = null;
        let selectionType = null;

        if (props.campaigns && props.campaigns.length > 0) {
            selection = props.campaigns[0];
            selectionType = 'campaigns';
        }
        else if (props.elections && props.elections.length > 0) {
            selection = props.elections[0];
            selectionType = 'elections';
        }

        this.state = {
            selection,
            selectionType
        };
        // END: Select first campaign/election in list by default

        this.switchSelection = this.switchSelection.bind(this);
    }

    switchSelection(selection) {
        this.setState({
            selection
        });
    }

    render() {
        const {
            campaigns,
            elections
        } = this.props;

        const {
            selection,
            selectionType       // May or may not use selectionType in the future
        } = this.state;

        return (
            <div className='app'>
                <Navigation
                    campaigns={ campaigns }
                    elections={ elections }
                    selectionId={ selection.id }
                    handleSelect={ this.switchSelection }
                />

                <MainContainer
                    selection={ selection }
                />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps)(App));

App.propTypes = {
    campaigns: PropTypes.array.isRequired,
    elections: PropTypes.array.isRequired,
};