import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import '../styles/app.scss';
import { mapStateToProps } from '../redux/selectors/App';
import Navigation from './Navigation';
import MainContainer from './MainContainer';


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectionId: props.items[0].id
        };

        this.switchSelection = this.switchSelection.bind(this);
    }

    switchSelection(id) {
        this.setState({
            selectionId: id
        });
    }

    render() {
        const {
            items
        } = this.props;

        const {
            selectionId
        } = this.state;

        return (
            <div className='app'>
                <Navigation
                    items={ items }
                    selectionId={ selectionId }
                    handleSelect={ this.switchSelection }
                />

                <MainContainer
                    selection={ items[selectionId] }
                />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps)(App));

App.propTypes = {
    items: PropTypes.array.isRequired
};