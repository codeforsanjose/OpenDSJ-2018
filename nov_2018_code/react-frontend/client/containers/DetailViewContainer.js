import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class DetailViewContainer extends Component {
    constructor(props) {
        super(props);

        this.renderSelectedItem = this.renderSelectedItem.bind(this);
    }

    // TODO add switch statement based on selection.type to use different CampaignTypes/ElectionTypes
    renderSelectedItem() {
        return (
            <div>
                YOUR SELECTION ID IS { this.props.selectionId }
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

DetailViewContainer.propTypes = {
    selectionId: PropTypes.number
};