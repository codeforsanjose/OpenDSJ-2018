import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ItemNavigation extends Component {
    constructor(props) {
        super(props);

        this.renderNavigationItems = this.renderNavigationItems.bind(this);
        this.renderNavigationGroups = this.renderNavigationGroups.bind(this);
    }

    renderNavigationItems(groupName) {
        const {
            navigationGroups,
            selectionId,
            handleSelect
        } = this.props;

        return navigationGroups[groupName].map(item => {
            const { id, title } = item;

            let classNames = 'navigation-item';
            classNames += selectionId === id ? ' selected-item' : '';

            return (
                <div className={ classNames }
                    key={ `navigation-${ id }` }
                    onClick={ handleSelect.bind(null, id) }>
                    { title }
                </div>
            );
        });
    }

    renderNavigationGroups() {
        const { navigationGroups } = this.props;

        const groups = [];

        let key = 0;
        for ( let groupName in navigationGroups ) {
            groups.push(
                <div className='navigation-group'
                     key={ `navigation-${ key }` }
                >
                    <h3>{ groupName }</h3>
                    { this.renderNavigationItems(groupName) }
                </div>
            );
            key++;
        }

        return groups;
    }

    render() {
        return (
            <div className='navigation'>
                <h2>November 6, 2018 Election</h2>

                { this.renderNavigationGroups() }
            </div>
        );
    }
}

ItemNavigation.propTypes = {
    navigationGroups: PropTypes.object,
    selectionId: PropTypes.number,
    handleSelect: PropTypes.func
};