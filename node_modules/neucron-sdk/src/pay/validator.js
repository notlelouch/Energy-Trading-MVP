import Joi from 'joi';

class Validator {
	constructor() {
	}

	async txMultipayc(opts) {
		const schema = Joi.object({
			Input: Joi.array().items(
				Joi.object({
					SequenceNum: Joi.number().integer().required(),
					Utxo_index: Joi.number().integer().required(),
				}),
			),
			LockTime: Joi.string().isoDate(),
			Outputs: Joi.array().items(
				Joi.object({
					Amount: Joi.number().integer().required(),
					Asm: Joi.string().required(),
				}),
			),
			Change_Address: Joi.string(),
		});

		await schema.validateAsync(opts);
	}

	/**
   * Initiates a payment channel transaction.
   *
   * @param {Object} options - The options for the payment channel transaction.
   * @param {string} options.walletID - The ID of the wallet initiating the transaction (query parameter).
   * @param {Object[]} options.inputs - Array of input data for the transaction.
   * @param {number} options.inputs[].sequenceNum - The sequence number of the input.
   * @param {number} options.inputs[].utxoId - The ID of the unspent transaction output (UTXO).
   * @param {string} options.lockTime - The lock time for the transaction (ISO date format).
   * @param {Object[]} options.outputs - Array of output data for the transaction.
   * @param {number} options.outputs[].amount - The amount for the output.
   * @param {string} options.outputs[].asm - The Assembly script for the output.
   * @param {string} options.changeAddress - The change address for the transaction.
   * @throws {Error} - If the options fail schema validation.
   */
	async payChannelTransaction(data) {
		const schema = Joi.object({
			amount: Joi.number().integer().required(),
			date: Joi.string().isoDate().required(),
		  receiverAddress: Joi.string().required(),
			sequenceNum: Joi.number().integer().required(),
			time: Joi.string().regex(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/).required(),
		});

		await schema.validateAsync(data);
	}

	async txSend(data) {
		const schema = Joi.object({
			output_Utxo: Joi.array().items(
				Joi.object({
					address: Joi.string().required(),
					amount: Joi.number().integer().required(),
				}),
			).required(),
		});

		await schema.validateAsync(data);
	}
}

export default new Validator;
