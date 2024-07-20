import Request from '../request.js';
class Stas {
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
   * Creates an asset on the Neucron platform.
   * @param {Object} options - The data for the asset creation.
   * @param {string} [options.walletId] - The data for the asset creation (Optional).
   * @throws {Error} Throws an error if the request fails.
   * @return {Object} The response data if successful.
   */
  async createAsset(options) {
    await this.validate();
    try {
      let endpoint = '/asset/create';
      const requestHeaders = {
        Authorization: this.auth.getAuthToken()
      };
      endpoint += '?assetName=' + options.assetName;
      delete options.assetName;
      if (options && options.walletId) {
        endpoint += '&walletID=' + options.walletId;
        delete options.walletId;
      }
      const response = await this.request.postRequest(endpoint, options, requestHeaders);
      if (response instanceof Error) {
        throw response;
      }
      return response.data.details;
    } catch (error) {
      throw new Error('Asset creation request failed: ' + error.message);
    }
  }

  /**
   * return list of assets
   * @throws {Error} Throws an error if the transaction request fails.
   * @return {Object} The headers of the response if successful.
   */
  async getAllAssets() {
    try {
      await this.validate();
      const endpoint = '/asset/list';
      let requestHeaders = {
        Authorization: this.auth.getAuthToken()
      };
      const response = await this.request.getRequest(endpoint, requestHeaders);
      if (response instanceof Error) {
        throw response;
      }
      return response.data;
    } catch (error) {
      throw new Error('Unable to fetch wallet Ids : ' + error);
    }
  }

  /**
  * return list of assets
  * @throws {Error} Throws an error if the transaction request fails.
  * @param {string} [options.walletId] - Required.
  * @return {Object} The headers of the response if successful.
  */
  async getAssetsByWalletId(walletId) {
    try {
      await this.validate();
      let endpoint = '/asset/list';
      let requestHeaders = {
        Authorization: this.auth.getAuthToken()
      };
      endpoint += '?walletID=' + walletId;
      const response = await this.request.getRequest(endpoint, requestHeaders);
      if (response instanceof Error) {
        throw response;
      }
      return response.data;
    } catch (error) {
      throw new Error('Unable to fetch wallet Ids : ' + error);
    }
  }

  /**
   * return status of asset
   * @param {string} tokenId tokenId of asset you want to fetch status of.
   * @throws {Error} Throws an error if the transaction request fails.
   * @return {Object} The headers of the response if successful.
   */
  async getAssetStatus(tokenId) {
    try {
      await this.validate();
      let endpoint = '/asset/status';
      let requestHeaders = {
        Authorization: this.auth.getAuthToken()
      };
      endpoint += '?tokenID=' + tokenId;
      const response = await this.request.getRequest(endpoint, requestHeaders);
      if (response instanceof Error) {
        throw response;
      }
      return response;
    } catch (error) {
      throw new Error('Unable to fetch Asset Status : ' + error);
    }
  }

  /**
   * get Tokens by address
   * @param {string} address  address of wallet you want to fetch tokens of
   * @throws {Error} Throws an error if the transaction request fails.
   * @return {Object} The headers of the response if successful.
   */
  async getTokensByAddress(address) {
    try {
      await this.validate();
      let endpoint = '/asset/tokens';
      let requestHeaders = {
        Authorization: this.auth.getAuthToken()
      };
      endpoint += '?address=' + address;
      const response = await this.request.getRequest(endpoint, requestHeaders);
      if (response instanceof Error) {
        throw response;
      }
      return response;
    } catch (error) {
      throw new Error('Unable to fetch Tokens from this address : ' + error);
    }
  }

  /**
   * get Tokens by walletId
   * @param {string} [options.walletId]  walletId they belong to if no walletId is provided then it will default walletId
   * @throws {Error} Throws an error if the transaction request fails.
   * @return {Object} The headers of the response if successful.
   */
  async listTokens(options) {
    try {
      await this.validate();
      let endpoint = '/asset/tokens/list';
      let requestHeaders = {
        Authorization: this.auth.getAuthToken()
      };
      if (options && options.walletId) {
        endpoint += '?walletID=' + options.walletId;
        delete options.walletId;
      }
      const response = await this.request.getRequest(endpoint, requestHeaders);
      if (response instanceof Error) {
        throw response;
      }
      return response;
    } catch (error) {
      throw new Error('Unable to process you request at this moment : ' + error);
    }
  }

  /**
   * get Tokens by walletId
   * @param {string} [options.walletId]  walletId they belong to if no walletId is provided then it will default walletId
   * @throws {Error} Throws an error if the transaction request fails.
   * @return {Object} The headers of the response if successful.
   */
  async listTokensByConsolidating(options) {
    try {
      await this.validate();
      let endpoint = '/asset/tokens/consolidated';
      let requestHeaders = {
        Authorization: this.auth.getAuthToken()
      };
      if (options && options.walletId) {
        endpoint += '?walletID=' + options.walletId;
        delete options.walletId;
      }
      const response = await this.request.getRequest(endpoint, requestHeaders);
      if (response instanceof Error) {
        throw response;
      }
      return response;
    } catch (error) {
      throw new Error('Unable to process you request at this moment : ' + error);
    }
  }

  /**
   * Transfer Asset .
   * @param {Object} options - The data for the asset creation.
   * @param {string} [options.walletId] - The data for the asset creation (Optional).
   * @throws {Error} Throws an error if the request fails.
   * @return {Object} The response data if successful.
   */
  async transferAsset(options) {
    await this.validate();
    try {
      let endpoint = '/asset/transfer';
      const requestHeaders = {
        Authorization: this.auth.getAuthToken()
      };
      if (options && options.walletId) {
        endpoint += '?walletID=' + options.walletId;
        delete options.walletId;
      }
      const response = await this.request.postRequest(endpoint, options, requestHeaders);
      if (response instanceof Error) {
        throw response;
      }
      return response;
    } catch (error) {
      throw new Error('Asset creation request failed: ' + error.message);
    }
  }

  /**
   * Transfer All Assets .
   * @param {Object} options - The data for the asset creation.
   * @param {string} [options.walletId] - The data for the asset creation (Optional).
   * @throws {Error} Throws an error if the request fails.
   * @return {Object} The response data if successful.
   */
  async transferAllAssets(options) {
    await this.validate();
    try {
      let endpoint = '/asset/transfer/address';
      const requestHeaders = {
        Authorization: this.auth.getAuthToken()
      };
      if (options && options.walletId) {
        endpoint += '?walletID=' + options.walletId;
        delete options.walletId;
      }
      const response = await this.request.postRequest(endpoint, options, requestHeaders);
      if (response instanceof Error) {
        throw response;
      }
      return response;
    } catch (error) {
      throw new Error('Asset processing failed: ' + error.message);
    }
  }
}
export default Stas;