import { combineReducers } from 'redux';

import { example_reducer } from './example_reducer';

/**
 * Used to combine all the reducers
 */
const reducers = combineReducers({
    example_reducer
});


export default reducers;
