import Request from '../request.js';

class Paymail {

  constructor(auth) {
	this.auth = auth;
	this.request = new Request();
  }

  async validate() {
	if (!this.auth.getAuthToken()) {
	  throw new Error('You must logged In. Try calling auth() method first');
	}
  }

 /**
 * Creates a new Paymail for a user.
 * @param {Object} options - The options for Paymail creation.
 * @param {string} paymail - The name of the Paymail to be created.
 * @param {string} [options.walletId] - The mnemonic to be used for Paymail creation (optional).
 * @throws {Error} Throws an error if the Paymail creation request fails.
 * @return {string} The Paymail ID if creation is successful.
 */
 async createPaymail(paymail,options) {
	try {
	  await this.validate();
  
	  if (!options.paymail) {
		throw new Error('Paymail Id is required for Paymail creation.');
	  }

	  const endpoint = '/wallet/paymail/create';
  
	  
	  const requestBody = {};
  
	  
	  const requestHeaders = {
		Authorization: this.auth.getAuthToken(),
	  };
  
	  
	  const queryString = `paymailID=${encodeURIComponent(paymail)}`;

	  
	  let requestUrl = `${endpoint}?${queryString}`;

	  if (options && options.walletId){
		requestUrl += '&walletID=' + queryParams.walletId;
		delete options.walletId
	  }
  
	  const response = await this.request.postRequest(requestUrl, requestBody, requestHeaders);
  

	  if (response instanceof Error) {
		throw response;
	  }

	  return await response;
	} catch (error) {
	  throw new Error('Paymail creation failed: ' + error);
	}
  } 

   /**
 * Updates Paymail for a user.
 * @param {Object} options - The options for Paymail creation.
 * @param {string} prevPaymail - The prev paymail .
 * @param {string} newPaymail - The new paymail to be update.
 * @throws {Error} Throws an error if the Paymail creation request fails.
 * @return {string} The Paymail ID if creation is successful.
 */
 async updatePaymail(paymail,newPaymail) {
	try {
	  await this.validate();
  
	  const endpoint = '/wallet/paymail/update';
  
	  const requestBody = {};
  
	  const requestHeaders = {
		Authorization: this.auth.getAuthToken(),
	  };
  
	  // Append PaymailName to the query parameters
	  const queryString = `paymailID=${encodeURIComponent(paymail)}&newPaymail=${encodeURIComponent(newPaymail)}`;
	  const requestUrl = `${endpoint}?${queryString}`;
  
	  // Make the POST request to create the Paymail
	  const response = await this.request.postRequest(requestUrl, requestBody, requestHeaders);
  
	  // Handle errors, if any
	  if (response instanceof Error) {
		throw response;
	  }
  
	  // Return the Paymail ID from the response data
	  return await response;
	} catch (error) {
	  throw new Error('Paymail creation failed: ' + error);
	}
  } 

  /**
   * get paymail list of user
   * @throws {Error} Throws an error if the transaction request fails.
   * @return {Object} The headers of the response if successful.
   */
  async getPaymailList() {
	try {
	  await this.validate();

	  let endpoint = '/wallet/paymail/list';

	  let requestHeaders = {
		Authorization: this.auth.getAuthToken()
	  };

	  const response = await this.request.getRequest(endpoint, requestHeaders);

	  if (response instanceof Error) {
		throw response;
	  }
	  return response;
	} catch (error) {
	  throw new Error('Unable to fetch transaction history: ' + error);
	}
  }

}

export default Paymail;
