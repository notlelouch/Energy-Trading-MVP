import Request from '../request.js';

class SmartContracts {
  constructor(auth) {
	this.auth = auth;
	this.request = new Request();
  }

  setAuthToken(token) {
	this.authToken = token;
  }

  getAuthToken() {
	return this.authToken;
  }

  async validate() {
	if (!this.auth.authToken) {
	  throw new Error('You must logged In. Try calling auth() method first');
	}
  }

  /**
   * Initiates a transaction to send funds/data with custom script. This function prepares and sends
   * a request to the designated API endpoint to create a transaction.
   * @param {string} options.script - custom script which you want to attach with your transaction.
   * @param {number} options.satoshi - amount of satoshi.
   * @param {string} [options.walletId] - The ID of the wallet associated with the transaction (optional).
   * @throws {Error} Throws an error if the transaction request fails.
   * @return {Object} The headers of the response if successful.
   */
  async txAsm(options) {
	try {
	  await this.validate();

	  let endpoint = '/tx/asm';

	  let requestHeaders = {
		Authorization: this.auth.getAuthToken(),
	  };

	  if (options && options.walletId) {
		endpoint += '?walletID=' + options.walletId;
		delete options.walletId
	  }

	  const requestBody = {
		'satoshi': options.satoshi,
		'script': options.script
	  };

	  const response = await this.request.postRequest(endpoint, requestBody, requestHeaders);

	  if (response instanceof Error) {
		throw response;
	  }

	  return response;
	} catch (error) {
	  throw new Error('Transaction request failed: ' + error);
	}
  }

  /**
   * Initiates a transaction for a multiple payment channel operation. This function prepares and sends
   * a request to the designated API endpoint to create a transaction involving multiple output types.
   *
   * @param {Object[]} options.Input - An array of input objects representing UTXO sequence pairs.
   * @param {Object[]} options.flag - An array of input objects representing UTXO sequence pairs.
   * @param {number} options.Input[].Sequence_Num - The sequence number of the input UTXO.
   * @param {number} options.Input[].Output_Index - The Index of the input UTXO.
   * @param {number} options.Input[].Prev_Txid - The sequence number of the input UTXO.
   * @param {number} options.Input[].Unlocking_Script - The Index of the input UTXO.
   * @param {string} options.LockTime - The lock time for the transaction in ISO 8601 date-time format.
   *                                   Example: "2006-01-02T15:04:05Z".
   * @param {Object[]} options.Outputs - An array of output objects defining the transaction outputs.
   * @param {number} options.Outputs[].Amount - The amount of cryptocurrency for the output, in integer units.
   *                                           Example: 100.
   * @param {string} options.Outputs[].Asm - The script assembly (ASM) code for the output.
   *                                        Example: "OP_2 OP_2 OP_ADD OP_EQUAL".
   * @param {string} options.changeAddress - The change address for the transaction.
   *
   * @param {string} [options.walletId] - The ID of the wallet associated with the transaction (optional).
   *
   * @throws {Error} Throws an error if the transaction request fails.
   * @return {Object} The headers of the response if successful.
   */
  async txMultiple(options) {
	try {
	  await this.validate();

	  let endpoint = '/tx/multiple';

	  let requestHeaders = {
		'Authorization': this.auth.getAuthToken()
	  };

	  if(options && options.walletId){
		endpoint += '?walletID=' + options.walletId;
		delete options.walletId
	  };

	  const requestBody = {
		Change_Address: options.changeAddress,
		Flag: options.flag,
		Input: options.Input,
		LockTime: options.LockTime,
		Outputs: options.Outputs,
	  };

	  const response = await this.request.postRequest(endpoint, requestBody, requestHeaders);

	  if (response instanceof Error) {
		throw response;
	  }

	  return response;
	} catch (error) {
	  throw new Error('Transaction request failed: ' + error.message);
	}
  }

  /**
   * Initiates a transaction for a multiple payment channel operation. This function prepares and sends
   * a request to the designated API endpoint to create a transaction involving multiple output types.
   *
   * @param {Object[]} options.Input - An array of input objects representing UTXO sequence pairs.
   * @param {Object[]} options.Flag - An array of input objects representing UTXO sequence pairs.
   * @param {number} options.Input[].Sequence_Num - The sequence number of the input UTXO.
   * @param {number} options.Input[].Output_Index - The Index of the input UTXO.
   * @param {number} options.Input[].Prev_Txid - The sequence number of the input UTXO.
   * @param {number} options.Input[].privatekey_in_Wif - The Index of the input UTXO.
   * @param {string} options.LockTime - The lock time for the transaction in ISO 8601 date-time format.
   *                                   Example: "2006-01-02T15:04:05Z".
   * @param {Object[]} options.Outputs - An array of output objects defining the transaction outputs.
   * @param {number} options.Outputs[].Amount - The amount of cryptocurrency for the output, in integer units.
   *                                           Example: 100.
   * @param {string} options.Outputs[].Asm - The script assembly (ASM) code for the output.
   *                                        Example: "OP_2 OP_2 OP_ADD OP_EQUAL".
   * @param {string} options.Change_Address - The change address for the transaction.
   *
   * @throws {Error} Throws an error if the transaction request fails.
   * @return {Object} The headers of the response if successful.
   */
  async txSign(options) {

	try {
	  await this.validate();

	  const endpoint = '/tx/sign';

	  const requestHeaders = {
		'Authorization': this.auth.getAuthToken()
	  };

	  const requestBody = {
		Change_Address: options.Change_Address,
		Flag: options.Flag,
		Input: options.Input,
		LockTime: options.LockTime,
		Outputs: options.Outputs,
	  };

	  const response = await this.request.postRequest(endpoint, requestBody, requestHeaders);

	  if (response instanceof Error) {
		throw response;
	  }

	  return response.headers;
	} catch (error) {
	  throw new Error('Transaction request failed: ' + error.message);
	}
  }

  /**
   * Unlock the funds/data of previous transaction. This function prepares and sends
   * a request to the designated API endpoint to create a transaction of unlocking previous transaction.
   *
   * @param {string} options.unlockingScript - unlocking script of prev transaction.
   * @param {number} options.outputIndex - output index of prev transaction which user want to unlock.
   * @param {string} options.prevTxID - previous transaction id which user want to unlock.
   * @param {string} [options.walletId] - The ID of the wallet associated with the transaction (Optional).
   *
   * @throws {Error} Throws an error if the transaction request fails.
   * @return {Object} The headers of the response if successful.
   */
  async txUnlock(options) {

	try {

	  await this.validate();
	  let endpoint = '/tx/unlock';

	  let requestHeaders = {
		Authorization: this.auth.getAuthToken()
	  };

	  if (options && options.walletId) {
		endpoint += '?walletID=' + options.walletId;
		delete options.walletId
	  }

	  const requestBody = {
		UnLocking_script: options.unlockingScript,
		output_Index: options.outputIndex,
		prevTxID: options.prevTxID
	  };

	  const response = await this.request.postRequest(endpoint, requestBody, requestHeaders);

	  if (response instanceof Error) {
		throw response;
	  }

	  return response;
	} catch (error) {
	  throw new Error('Transaction request failed: ' + error);
	}
  }

}
export default SmartContracts;
