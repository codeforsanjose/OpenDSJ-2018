import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Navigation extends Component {
    constructor(props) {
        super(props);

        this.renderNavigationItems = this.renderNavigationItems.bind(this);
    }

    renderNavigationItems() {
        const {
            items,
            handleSelect,
            selectionId
        } = this.props;

        return items.map((item) => {
            const {
                id
            } = item;

            let classNames = 'navigation-item';
            classNames += selectionId === id ? ' selected-item' : '';

           return (
               <div
                   className={ classNames }
                   key={ `navigation-${id}` }
                   onClick={ handleSelect.bind(null, id) }
               >
                   { id }
               </div>
           );
        });
    }

    render() {
        return (
            <div className='navigation'>
                <h2>November 6, 2018 Election</h2>

                { this.renderNavigationItems() }
            </div>
        );
    }
}

Navigation.propTypes = {
    items: PropTypes.array.isRequired,
    selectionId: PropTypes.number.isRequired,
    handleSelect: PropTypes.func.isRequired
};