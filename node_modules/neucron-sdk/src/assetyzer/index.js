import Request from '../request.js';

class Assetyzer {

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
   * Register an Asset on the Neucron platform.
   * @param {Object} options - The data for the Assetyzer creation.
   * @param {string} options.assetType - The type of the asset.
   * @param {string} [options.walletId] - The type of the asset.
   * @throws {Error} Throws an error if the request fails.
   * @return {Object} The response data if successful.
   */
  async register(options) {

	await this.validate();

	try {
	  let endpoint = '/asset/register';

	  const requestHeaders = {
		Authorization: this.auth.getAuthToken()
	  };

	  endpoint += '?assetType=' + options.assetType;
	  delete options.assetType

	  if (options && options.walletId){
		endpoint += '&walletID=' + options.walletId;
		delete options.walletId
	  }

	  const response = await this.request.postRequest(endpoint,options,requestHeaders);

	  if (response instanceof Error) {
		throw response;
	  }

	  return response.data;
	} catch (error) {
	  throw new Error(error.message);
	}
  }

  /**
   * Creates an Assetyzer on the Neucron platform.
   * @param {Object} options - The data for the Assetyzer creation.
   * @throws {Error} Throws an error if the request fails.
   * @return {Object} The response data if successful.
   */
  async send(options) {

	await this.validate();

	try {
	  let endpoint = '/asset/send';

	  const requestHeaders = {
		Authorization: this.auth.getAuthToken()
	  };
		
	  endpoint += '?assetID=' + options.assetId;
	  delete options.assetId

	  if (options && options.walletId){
		endpoint += '&walletID=' + queryParams.walletId;
		delete options.walletId
	  }

	  const response = await this.request.postRequest(endpoint,options,requestHeaders);

	  if (response instanceof Error) {
		throw response;
	  }

	  return response;
	} catch (error) {
	  throw new Error(error.message);
	}
  }


  /**
   * deploy asset on chain
   * @param {string} assetId assetId of Asset you want to deploy.
   * @throws {Error} Throws an error if the transaction request fails.
   * @return {Object} The headers of the response if successful.
   */
  async deploy(assetId) {
	try {

	  await this.validate();
	  let endpoint = '/asset/deploy';

	  let requestHeaders = {
		Authorization: this.auth.getAuthToken()
	  };

	  endpoint += '?assetID=' + assetId;

	  const response = await this.request.getRequest(endpoint, requestHeaders);

	  if (response instanceof Error) {
		throw response;
	  }
	  return response;
	} catch (error) {
	  throw new Error('Unable to fetch Assetyzer Status : ' + error);
	}
  }

  /**
   * get asset detail by id
   * @param {string} assetId assetId of Asset you want to get detail of.
   * @throws {Error} Throws an error if the transaction request fails.
   * @return {Object} The headers of the response if successful.
   */
 async getAssetDetailById(assetId) {
	try {

	  await this.validate();
	  let endpoint = '/asset/detail';

	  let requestHeaders = {
		Authorization: this.auth.getAuthToken()
	  };


	  endpoint += '?assetID=' + assetId;

	  const response = await this.request.getRequest(endpoint, requestHeaders);

	  if (response instanceof Error) {
		throw response;
	  }
	  return response;
	} catch (error) {
	  throw new Error('Unable to fetch Assetyzer Status : ' + error);
	}
 }

 /**
   * get asset detail by id
   * @param {string} assetId assetId of Asset you want to get detail of.
   * @throws {Error} Throws an error if the transaction request fails.
   * @return {Object} The headers of the response if successful.
   */
 async recall(assetId, holderPaymail, options) {
	try {

	  await this.validate();
	  let endpoint = '/asset/detail';

	  let requestHeaders = {
		Authorization: this.auth.getAuthToken()
	  };


	  endpoint += '?assetID=' + assetId + '&' + 'holderPaymail=' + holderPaymail;

	  if (options && options.walletId){
		endpoint += '&walletID=' + queryParams.walletId;
		delete options.walletId
	  }

	  const response = await this.request.getRequest(endpoint, requestHeaders);

	  if (response instanceof Error) {
		throw response;
	  }
	  return response;
	} catch (error) {
	  throw new Error('Unable to fetch Assetyzer Status : ' + error);
	}
 }
}

export default Assetyzer;
