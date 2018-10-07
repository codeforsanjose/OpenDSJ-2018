import fetch from 'fetch'

const baseURL = 'localhost:8080/'
const getFetchRequest = (url) => {
    const fullURL = baseURL + url;
    return fetch(fullURL)
    .then(function(response) {
        return response.json();
    });
}

const postFetchWithOptions = (url, options = {}, data = {}) => {
    const fullURL = baseURL + url;
    return fetch(fullURL, {
        method: 'POST',
        ...options,
        body: JSON.stringify(data),
    })
    .then(response => {
        response.json()
    });
}


export {
    getFetchRequest,
    postFetchWithOptions
}