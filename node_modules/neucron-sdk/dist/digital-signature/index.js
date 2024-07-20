import Request from '../request.js';
class DigitalSignature {
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
  * sign a message .
  * @param {Object} options - The options for signing message.
  * @param {string} options.message - message which needs to be sign.
  * @throws {Error} Throws an error if the Paymail creation request fails.
  * @return {string} The Paymail ID if creation is successful.
  */
  async signature(options) {
    try {
      await this.validate();
      const endpoint = '/tx/mesign';
      const requestBody = {
        message: options.message
      };
      const requestHeaders = {
        Authorization: this.auth.getAuthToken()
      };
      const response = await this.request.postRequest(endpoint, requestBody, requestHeaders);
      if (response instanceof Error) {
        throw response;
      }
      return await response;
    } catch (error) {
      throw new Error('Paymail creation failed: ' + error);
    }
  }

  /**
  * sign a message .
  * @param {Object} options - The options for signing message.
  * @param {string} options.message - message which needs to be sign.
  * @param {string} options.public_Key - public key of signed message
  * @param {string} options.signature_hex - signature hex of signed message
  * @throws {Error} Throws an error if the Paymail creation request fails.
  * @return {string} The Paymail ID if creation is successful.
  */
  async verify(options) {
    try {
      await this.validate();
      const endpoint = '/tx/meverify';
      const requestBody = {
        message: options.message,
        public_Key: options.public_Key,
        signature_hex: options.signature_hex
      };
      const requestHeaders = {
        Authorization: this.auth.getAuthToken()
      };
      const response = await this.request.postRequest(endpoint, requestBody, requestHeaders);
      if (response instanceof Error) {
        throw response;
      }
      return await response;
    } catch (error) {
      throw new Error('Verification failed: ' + error);
    }
  }
}
export default DigitalSignature;