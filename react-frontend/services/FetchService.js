const fetch = require('node-fetch');
const fetchRequest = (url) => {
    return fetch(url)
    .then(function(response) {
        return response.json();
    });
}

const fetchWithOptions = (url, options = {}, data = {}) => {
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
    })
    .then(response => {
        return response.json()
    });
}


module.exports = {
    fetchRequest,
    fetchWithOptions
}