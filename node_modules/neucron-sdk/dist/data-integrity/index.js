import Request from '../request.js';
import FormData from 'form-data';
import Helper from './helper.js';
import validator from './validator.js';
class DataIntegrity {
  constructor(auth) {
    this.auth = auth;
    this.validator = validator;
    this.request = new Request();
  }
  async validate() {
    if (!this.auth.getAuthToken()) {
      throw new Error('You must logged In. Try calling auth() method first');
    }
  }

  /**
     * Function to Upload File on Blockchain [Bitcom]
     *
     * @param {string} options.filePath - file path to upload on blockchain.
     * @param {string} options.walletId - The ID of the wallet associated with the transaction.
     * @param {string} options.data - The data you want to associate with this Tx
     *
     * @throws {Error} Throws an error if the transaction request fails.
     * @return {Object} The headers of the response if successful.
     */
  async uploadFile(options) {
    try {
      await this.validator.uploadFile(options);
      await this.validate();
      let url = '/tx/file';
      let requestHeaders = {
        'Authorization': this.auth.getAuthToken(),
        'Content-Type': 'multipart/form-data'
      };
      const formData = new FormData();
      Helper.fileUploadMiddleware(formData, options.filePath);
      requestHeaders = {
        ...requestHeaders,
        ...formData.getHeaders()
      };
      if (options.data) {
        formData.append('data', options.data);
      }
      const response = await this.request.postRequest(Helper.addParamsInURL(url, options), formData, requestHeaders);
      if (response instanceof Error) {
        throw response;
      }
      return response;
    } catch (error) {
      throw new Error('Transaction request failed: ' + error);
    }
  }

  /**
     * Function to post data on blockchain
     *
     * @param {string} options.message - message to post on blockchain.
     * @param {string} options.walletId - The ID of the wallet associated with the transaction.
     * @throws {Error} Throws an error if the transaction request fails.
     * @return {Object} The headers of the response if successful.
     */
  async postData(options) {
    try {
      await this.validator.postData(options);
      await this.validate();
      let url = '/tx/postdata';
      let requestHeaders = {
        'Authorization': this.auth.getAuthToken(),
        'accept': 'application/json'
      };
      const response = await this.request.postRequest(Helper.addParamsInURL(url, options), options, requestHeaders);
      if (response instanceof Error) {
        throw response;
      }
      return response;
    } catch (error) {
      throw new Error('Transaction request failed: ' + error);
    }
  }

  /**
     * Function to Upload File on Blockchain [Bitcom]
     *
     * @param {string} options.filePath - file path to upload on blockchain.
     * @param {string} [options.walletId] - The ID of the wallet associated with the transaction.
     * @param {string} options.publicKey - public key you want to associate with this Tx
     *
     * @throws {Error} Throws an error if the transaction request fails.
     * @return {Object} The headers of the response if successful.
     */
  async uploadEncryptFile(options) {
    try {
      await this.validator.uploadEncryptFile(options);
      await this.validate();
      let url = '/tx/encrypt';
      let requestHeaders = {
        'Authorization': this.auth.getAuthToken(),
        'Content-Type': 'multipart/form-data'
      };
      const formData = new FormData();
      Helper.fileUploadMiddleware(formData, options.filePath);
      requestHeaders = {
        ...requestHeaders,
        ...formData.getHeaders()
      };
      formData.append('publickey', options.publicKey);
      const response = await this.request.postRequest(Helper.addParamsInURL(url, options), formData, requestHeaders);
      if (response instanceof Error) {
        throw response;
      }
      return response;
    } catch (error) {
      throw new Error('Transaction request failed: ' + error);
    }
  }

  /**
     *Function to Upload File on 1 Sat Ordinal Blockchain
     *
     * @param {string} options.filePath - file path to upload on blockchain.
     * @param {string} options.walletId - The ID of the wallet associated with the transaction.
     *
     * @throws {Error} Throws an error if the transaction request fails.
     * @return {Object} The headers of the response if successful.
     */
  async uploadFileOnOrdinal(options) {
    try {
      await this.validator.uploadFileOnOrdinal(options);
      await this.validate();
      let url = '/tx/upload';
      let requestHeaders = {
        'Authorization': this.auth.getAuthToken(),
        'Content-Type': 'multipart/form-data'
      };
      const formData = new FormData();
      Helper.fileUploadMiddleware(formData, options.filePath);
      requestHeaders = {
        ...requestHeaders,
        ...formData.getHeaders()
      };
      const response = await this.request.postRequest(Helper.addParamsInURL(url, options), formData, requestHeaders);
      if (response instanceof Error) {
        throw response;
      }
      return response;
    } catch (error) {
      throw new Error('Transaction request failed: ' + error);
    }
  }

  /**
     *Function to Hash Tx
     *
     * @param {string} options.filePath - file path to upload on blockchain.
     * @param {string} options.walletId - The ID of the wallet associated with the transaction.
     *
     * @throws {Error} Throws an error if the transaction request fails.
     * @return {Object} The headers of the response if successful.
     */
  async uploadHashedFile(options) {
    try {
      await this.validator.uploadHashedFile(options);
      await this.validate();
      let url = '/tx/hash';
      let requestHeaders = {
        'Authorization': this.auth.getAuthToken(),
        'Content-Type': 'multipart/form-data'
      };
      const formData = new FormData();
      Helper.fileUploadMiddleware(formData, options.filePath);
      requestHeaders = {
        ...requestHeaders,
        ...formData.getHeaders()
      };
      const response = await this.request.postRequest(Helper.addParamsInURL(url, options), formData, requestHeaders);
      if (response instanceof Error) {
        throw response;
      }
      return response;
    } catch (error) {
      throw new Error('Transaction request failed: ' + error);
    }
  }
}
export default DataIntegrity;