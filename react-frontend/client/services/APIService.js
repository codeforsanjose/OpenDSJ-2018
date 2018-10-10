

const baseURL = 'http://localhost:8080/'
const getFetchRequest = (url) => {
    const fullURL = baseURL + url;
    return fetch(url)
        .then(function(response) {
            return response.json();
        });
}

const postFetchWithOptions = (url, options = {}, data = {}) => {
    const fullURL = baseURL + url;
    return fetch(fullURL, {
        method: 'POST',
        ...options,
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            //"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            ...options.headers
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        return response.json()
    });
}


export {
    getFetchRequest,
    postFetchWithOptions
}