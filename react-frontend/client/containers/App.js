import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { mapStateToProps } from '../redux/selectors/App';

import '../styles/app.scss';

class App extends Component {
    render() {
        return (
            <div className='main'>
                Hello World!
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps)(App));
