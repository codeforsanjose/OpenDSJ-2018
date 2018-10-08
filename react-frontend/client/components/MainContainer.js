import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MainContainer extends Component {
    constructor(props) {
        super(props);

        this.renderSelectedItem = this.renderSelectedItem.bind(this);
    }

    renderSelectedItem() {
        return (
            <div>
                YOUR SELECTION IS { this.props.selection.title }
            </div>
        );
    }

    render() {
        return (
            <div className='main-container'>
                { this.renderSelectedItem() }
            </div>
        );
    }
}

MainContainer.propTypes = {
    selection: PropTypes.object.isRequired
};