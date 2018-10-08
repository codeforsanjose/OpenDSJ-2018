import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Navigation extends Component {
    constructor(props) {
        super(props);

        this.renderCampaigns = this.renderCampaigns.bind(this);
        this.renderElections = this.renderElections.bind(this);
    }

    renderCampaigns() {
        const {
            campaigns,
            handleSelect,
            selectionId
        } = this.props;

        return campaigns.map((campaign) => {
            const {
                id,
                title
            } = campaign;

            let classNames = 'navigation-item';
            classNames += selectionId === id ? ' selected-item' : '';

           return (
               <div
                   className={ classNames }
                   key={ `navigation-${id}` }
                   onClick={ handleSelect.bind(null, campaign) }
               >
                   { title }
               </div>
           );
        });
    }

    renderElections() {
        const {
            elections,
            handleSelect,
            selectionId
        } = this.props;

        return elections.map((election) => {
            const {
                id,
                title
            } = election;

            let classNames = 'navigation-item';
            classNames += selectionId === id ? ' selected-item' : '';

            return (
                <div
                    className={ classNames }
                    key={ `navigation-${id}` }
                    onClick={ handleSelect.bind(null, election) }
                >
                    { title }
                </div>
            );
        });
    }


    // TODO add headers for each election/campaign type
    render() {
        return (
            <div className='navigation'>
                <h2>November 6, 2018 Election</h2>

                { this.renderCampaigns() }
                { this.renderElections() }
            </div>
        );
    }
}

Navigation.propTypes = {
    campaigns: PropTypes.array.isRequired,
    elections: PropTypes.array.isRequired,
    selectionId: PropTypes.number.isRequired,
    handleSelect: PropTypes.func.isRequired
};