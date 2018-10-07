import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import '../styles/app.scss';
import { mapStateToProps } from '../redux/selectors/App';

class App extends Component {
    render() {
        return (
            <div className='main'>
                Hello World!
                <LocalVoteMattersComponent />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps)(App));
