import Request from '../request.js';

import validator from './validator.js';

class Authentication {


  constructor(config) {
	this.authToken = config?.authToken;
	this.validator = validator;
	this.request = new Request();
  }

  setAuthToken(token) {
	this.authToken = token;
  }

  getAuthToken() {
	return this.authToken;
  }

  async validate() {
	if (!this.authToken) {
	  throw new Error('You must logged In. Try calling auth() method first');
	}
  }

  /**
   * Lets a user sign up with email and password.
   * @param {string} options.password - password of user.
   * @param {string} options.email - email of user.
   * @throws {Error} Throws an error if the transaction request fails.
   * @return {Object} The headers of the response if successful.
   */
  async signUp(options) {
	try {
	  await this.validator.signup(options);

	  const endpoint = '/auth/signup';

	  const requestBody = {
		email: options.email,
		password: options.password,
	  };

	  const response = await this.request.postRequest(endpoint, requestBody);

	  if (response instanceof Error) {
		throw response;
	  }
	  this.setAuthToken(response.data.access_token);
	  return response;
	} catch (error) {
	  throw new Error('Signup request failed: ' + error);
	}
  }

  /**
   * Lets a user login with email and password.
   * @param {string} options.password - password of user.
   * @param {string} options.email - email of user.
   * @throws {Error} Throws an error if the transaction request fails.
   * @return {Object} The headers of the response if successful.
   */
  async login(options) {
	try {
	  await this.validator.login(options);

	  const endpoint = '/auth/login';

	  const requestBody = {
		email: options.email,
		password: options.password,
	  };

	  const response = await this.request.postRequest(endpoint, requestBody);

	  this.setAuthToken(response.data.access_token);
	  if (response instanceof Error) {
		throw response;
	  }

	  return response;
	} catch (error) {
	  throw new Error('Authentication request failed: ' + error);
	}
  }

  /**
   * create token and send to user respective emailId
   * @param {string} options.email - token user get on email.
   * @throws {Error} Throws an error if the transaction request fails.
   * @return {Object} The headers of the response if successful.
   */
  async forgotPassword(options) {
	try {
	  await this.validator.forgotPassword(options);
	  const endpoint = '/auth/forgot_password';

	  const query = `?email=${options.email}`;
	  const response = await this.request.getRequest(endpoint, {} , query);
	  if (response instanceof Error) {
		throw response;
	  }
	  return response;
	} catch (error) {
	  throw new Error('Processing failed: ' + error);
	}
  }

  /**
   * Lets a user signup/login using phone number
   * @param {string} options.phone - phone number of user.
   * @param {string} options.country_code - country code of user.
   * @throws {Error} Throws an error if the transaction request fails.
   * @return {Object} The headers of the response if successful.
   */
  async phone(options) {
	try {
	  await this.validator.phone(options);

	  const endpoint = '/auth/phone';
	  const query = `?phone=${options.phone}&country_code=${options.country_code}`;
	  const response = await this.request.postRequest(endpoint+query);
	  if (response instanceof Error) {
		throw response;
	  }

	  return response;
	} catch (error) {
	  throw new Error('Processing failed: ' + error);
	}
  }

  /**
   * Signup/login using phone number and send OTP if user doesnt exist then it will create fresh account
   * @param {string} query.phone - phone number of user.
   * @param {string} query.country_code - country code of user.
   * @throws {Error} Throws an error if the transaction request fails.
   * @return {Object} The headers of the response if successful.
   **/
  async sendOtp(query) {
	await this.validator.phone(query);

	const url = '/auth/phone';

	const headers = {
	  phone: query.phone,
	  countryCode: query.country_code,
	};

	const resp = await this.request.postRequest(url, {}, headers);

	if (resp instanceof Error) {

	  throw resp;
	}
	return resp.headers;
  }

  /**
   * verify phone number using otp
   * @param {string} options.phone - phone number of user.
   * @param {string} options.otp - otp received by user over phone number.
   * @throws {Error} Throws an error if the transaction request fails.
   * @return {Object} The headers of the response if successful.
   **/
  async verifyPhoneNo(options) {
	await this.validator.verifyPhoneNo(options);

	const url = '/auth/phone/verify';

	const query = `?phone=${options.phone}&otp=${options.otp}`;

	const resp = await this.request.postRequest(url+ query, {}, {'accept': 'application/json'});

	if (resp instanceof Error) {

	  throw resp;
	}
	return resp;
  }
}

export default Authentication;
