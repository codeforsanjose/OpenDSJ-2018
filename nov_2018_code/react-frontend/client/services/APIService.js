import fetch from 'fetch';

const getFetchRequest = (url) => {
	return fetch(url)
		.then(function(response) {
			return response.json();
		});
};

const postFetchWithOptions = (url, options = {}, data = {}) => {
	return fetch(url, {
		method: 'POST',
		...options,
		body: JSON.stringify(data),
	})
		.then(response => {
			response.json();
		});
};


export {
	getFetchRequest,
	postFetchWithOptions
};