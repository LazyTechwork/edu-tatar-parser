const request = require("request");

function get(url, config) {
	return new Promise((resolve, reject) => {
		request(url, function (error, response, body) {
			if (error)
				reject(error);
            resolve({response, body});
        });
	});
}

function post(url, data, config) {
	return new Promise((resolve, reject) => {
		request.post(url, (error, response, body) => {
			if (error)
				reject(error);
			resolve({response, body});
		});
	});
}

module.exports = {get, post, jar: request.jar};