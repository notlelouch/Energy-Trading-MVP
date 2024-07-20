import Request from '../request.js';
import validator from './validator.js';

class Pay {
	constructor(auth) {
		this.auth = auth;
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
		if (!this.auth.authToken) {
			throw new Error('You must logged In. Try calling auth() method first');
		}
	}

	/**
   * Initiates a transaction for a multiple payment channel operation. This function prepares and sends
   * a request to the designated API endpoint to create a transaction involving multiple output types.
   *
   * @param @param {string} [options.changeAddress] - address at which remaining funds will come (Optional).
   * @param {Object[]} options.input - An array of input objects representing UTXO sequence pairs.
   * @param {number} options.input[].SequenceNum - The sequence number of the input UTXO.
   * @param {number} options.input[].Utxo_index - The Index of the input UTXO.
   * @param {string} options.lockTime - The lock time for the transaction in ISO 8601 date-time format.
   *                                   Example: "2006-01-02T15:04:05Z".
   * @param {Object[]} options.outputs - An array of output objects defining the transaction outputs.
   * @param {number} options.outputs[].Amount - The amount of cryptocurrency for the output, in integer units.
   *                                           Example: 100.
   * @param {string} options.outputs[].Asm - The script assembly (ASM) code for the output.
   *                                        Example: "OP_2 OP_2 OP_ADD OP_EQUAL".
   * @param {string} [queryParams.walletId] - The ID of the wallet associated with the transaction.
   * @throws {Error} Throws an error if the transaction request fails.
   * @return {Object} The headers of the response if successful.
   */
	async txMultipayc(options,queryParams) {
		try {
			await this.validate();
			await this.validator.txMultipayc(options);

			const endpoint = '/tx/multipayc';

			let requestHeaders = {
				'Authorization': this.auth.getAuthToken()
			};

			if (queryParams && queryParams.walletId){
			  requestHeaders = {
				...requestHeaders,
				'walletID': queryParams.walletId,
			  };
			}

			if (queryParams && queryParams.changeAddress){
			  requestHeaders = {
				...requestHeaders,
				Change_Address: queryParams.changeAddress
			  };
			}

			const requestBody = {
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
			throw new Error('Pay request failed: ' + error);
		}
	}

	/**
   * Initiates a payment channel transaction.
   *
   * @param {Object} options - The options for the payment channel transaction.
   * @param {string} options.receiverAddress - The recipient's address.
   * @param {number} options.amount - The amount of the transaction.
   * @param {string} options.date - The date of the transaction (format: yyyy-mm-dd).
   * @param {number} options.sequenceNum - The sequence number of the transaction.
   * @param {string} options.time - The time of the transaction (format: hh:mm:ss).
   *
   * @throws {Error} - If the transaction fails or encounters an error.
   * @returns {Object} - The response options from the transaction.
   */
	async payChannelTxn( options) {
		try {
			await this.validate();
			await this.validator.payChannelTransaction(options);

			const endpoint = '/tx/payc';

			const requestHeaders = {
			  Authorization: this.auth.getAuthToken()
			};

			const requestBody = {
				amount: options.amount,
				date: options.date,
				reciver_address: options.receiverAddress,
				sequence_Num: options.sequenceNum,
				time: options.time,
			};

			const response = await this.request.postRequest(endpoint, requestBody, requestHeaders);

			if (response instanceof Error) {
				throw response;
			}

			return response;
		} catch (error) {
			throw new Error('Pay request failed: ' + error.message);
		}
	}

	/**
   * Initiates a transaction for sending cryptocurrency to multiple output addresses.
   *
   * @param {{output_Utxo: [{amount: number, address: string}]}} options - Options for configuring the transaction.
   * @param {Object[]} options.output_Utxo - An array of output objects representing recipient addresses and amounts.
   * @param {string} options.output_Utxo[].address - The recipient's address.
   * @param {number} options.output_Utxo[].amount - The amount of cryptocurrency to be sent, in integer units.
   * @param {string} [queryParams.changeAddress] - The change address for the transaction (Optional).
   * @param {string} [queryParams.walletId] - The ID of the wallet associated with the transaction (Optional).
   *
   * @throws {Error} Throws an error if the transaction request fails.
   * @return {Object} The headers of the response if successful.
   */
	async txSend(options, queryParams) {
		try {
			await this.validate();
			await this.validator.txSend(options);

			let endpoint = '/tx/send';

			let requestHeaders = {
				'Authorization': this.auth.getAuthToken()
			};

			if (queryParams && queryParams.walletId){
			  endpoint += '?walletID=' + queryParams.walletId;
			}

			const requestBody = {
				output_Utxo: options.output_Utxo,
			};

		  // eslint-disable-next-line no-console
			console.log(endpoint);
			const response = await this.request.postRequest(endpoint, requestBody, requestHeaders);

			if (response instanceof Error) {
				throw response;
			}

			return response;
		} catch (error) {
			throw new Error('Pay request failed: ' + error);
		}
	}

		/**
   * Initiates a transaction for sending cryptocurrency to multiple output addresses.
   *
   * @param {{outputs: [{amount: number, address: string, note: string}]}} options - Options for configuring the transaction.
   * @param {Object[]} options.output - An array of output objects representing recipient addresses and amounts.
   * @param {string} options.outputs.address - The recipient's address.
   * @param {number} options.outputs.amount - The amount of cryptocurrency to be sent, in integer units.
   * @param {string} options.outputs.note - Note. 
   * @param {string} [queryParams.changeAddress] - The change address for the transaction (Optional).
   * @param {string} [queryParams.walletId] - The ID of the wallet associated with the transaction (Optional).
   *
   * @throws {Error} Throws an error if the transaction request fails.
   * @return {Object} The headers of the response if successful.
   */
		async txSpend(options, queryParams) {
			try {
				await this.validate();
	
				let endpoint = '/tx/spend';
	
				let requestHeaders = {
					'Authorization': this.auth.getAuthToken()
				};
	
				if (queryParams && queryParams.walletId){
				  endpoint += '?walletID=' + queryParams.walletId;
				}
	
				const requestBody = {
					outputs: options.outputs,
				};

				const response = await this.request.postRequest(endpoint, requestBody, requestHeaders);
	
				if (response instanceof Error) {
					throw response;
				}
	
				return response;
			} catch (error) {
				throw new Error('Pay request failed: ' + error);
			}
		}
}

export default Pay;
