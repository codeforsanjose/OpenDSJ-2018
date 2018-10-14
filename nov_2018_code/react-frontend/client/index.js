import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import logger from 'redux-logger';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';

import reducers from './reducers';
import App from './containers/MainContainer';

const store = createStore(reducers, applyMiddleware(logger));

ReactDOM.render(
    <Provider store={ store }>
        <BrowserRouter>
            <Switch>
                <Route path='/' component={ App }/>
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById('app-container')
);
