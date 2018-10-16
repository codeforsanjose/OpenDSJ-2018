import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { mapStateToProps } from '../selectors/containers/MainContainer';
import Navigation from '../compositions/Navigation';
import DetailViewContainer from './DetailViewContainer';
import LocalOfficialsOfficesLookup from '../compositions/LocalOfficialsOfficesLookup/LocalOfficalsOfficesLookup';
import '../styles/app.scss';

class MainContainer extends Component {
    constructor(props) {
        super(props);

        // Set the selection to the first nav item
        for ( let groupName in props.navigationGroups ) {
            if (props.navigationGroups[groupName].length) {
                this.state = {
                    selectionId: props.navigationGroups[groupName][0].id
                };
                break;
            }
        }

        this.switchSelection = this.switchSelection.bind(this);
    }

    switchSelection(selectionId) {
        this.setState({
            selectionId
        });
    }

    render() {
        const { navigationGroups } = this.props;
        const { selectionId } = this.state;
        console.log('what be navigationGroups', navigationGroups)
        return (
            <div className='app'>
                <Navigation
                    navigationGroups={ navigationGroups }
                    selectionId={ selectionId }
                    handleSelect={ this.switchSelection }
                />

                <DetailViewContainer
                    selectionId={ selectionId }
                />
                <hr />
                <LocalOfficialsOfficesLookup />
            </div>
        );
    }
}

export default connect(mapStateToProps)(MainContainer);

MainContainer.propTypes = {
    navigationGroups: PropTypes.object
};