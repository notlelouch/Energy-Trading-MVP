import axios from 'axios';
import {baseURL} from './config.js';


class Request {
	constructor() {}

  globalHeaders = {
	'Content-Type': 'application/json'
  };

	async postRequest(reqPath, data, headers) {
		let url = baseURL;
		url += `${reqPath}`;
		const response = await axios.post(url, data, {
			headers: {
				 ...this.globalHeaders, ...headers
			},
		});
		if (response.status < 400) {
			return response.data;
		} else {
			const error = new Error();
			error.info = response.data;
			return error;
		}
	}

	async putRequest(reqPath, data, headers) {
		let url = baseURL;
		url += `${reqPath}`;
		const response = await axios.put(url, data, {
			headers: {
				...headers,
			},
		});
		if (response.status < 400) {
			return response.data;
		} else {
			const error = new Error();
			error.info = response.data;
			return error;
		}
	}

	async getRequest(reqPath, headers, query) {
		let url = baseURL;
		url += `${reqPath}`;


		if (query) {
			url += query;
		}

		const response = await axios.get(url, {
			headers: {
				...headers,
			},
		});
		if (response.status < 400) {
			return response.data;
		} else {
			const error = new Error();
			error.info = response.data;
			return error;
		}
	}

	async deleteRequest(reqPath, config) {
		let url = baseURL;
		url += `${reqPath}`;
		const response = await axios.delete(url, {
			headers: {
				...config,
			},
		});
		if (response.status < 400) {
			return response.data;
		} else {
			const error = new Error();
			error.info = response.data;
			return error;
		}
	}
}

export default Request;
