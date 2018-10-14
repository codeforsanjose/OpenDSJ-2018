import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import logger from 'redux-logger';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';

import reducers from './reducers';
import Dashboard from './containers/Dashboard';
import Home from './containers/Home';
import './styles/index.scss';

const store = createStore(reducers, applyMiddleware(logger));

ReactDOM.render(
    <Provider store={ store }>
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={ Home }/>
                <Route exact path='/dashboard' component={ Dashboard }/>
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById('app-container')
);
