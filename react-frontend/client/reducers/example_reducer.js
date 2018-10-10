import { createActionAsync, createReducerAsync } from 'redux-act-async';

const example = params => {
    return new Promise((resolve, reject) => {
        const options = {
            method: 'GET'
        };

        fetch(`http://localhost:3000`, options)
            .then(response => response.json())
            .then(
                responseJson => {
                    resolve(responseJson);
                },
                error => {
                    reject(error);
                }
            );
    });
};

export const example_action =
    createActionAsync('example_action', example);
export const example_reducer =
    createReducerAsync(example_action);