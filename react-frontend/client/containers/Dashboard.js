import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { mapStateToProps } from '../selectors/containers/Dashboard';
import ItemNavigation from '../compositions/\uF702ItemNavigation';
import DetailViewContainer from './DetailViewContainer';
import '../styles/dasbhoard.scss';

class Dashboard extends Component {
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

        return (
            <div className='dashboard'>
                <ItemNavigation
                    navigationGroups={ navigationGroups }
                    selectionId={ selectionId }
                    handleSelect={ this.switchSelection }
                />

                <DetailViewContainer
                    selectionId={ selectionId }
                />
            </div>
        );
    }
}

export default connect(mapStateToProps)(Dashboard);

Dashboard.propTypes = {
    navigationGroups: PropTypes.object
};