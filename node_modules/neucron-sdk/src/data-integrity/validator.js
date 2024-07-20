import Joi from 'joi';

class Validator {

	async uploadFile(options) {
		const schema = Joi.object({
		  filePath: Joi.string().required(),
		  walletId: Joi.string(),
		  data: Joi.string(),
		});
	
		await schema.validateAsync(options);
	  }

	async postData(opts) {
		const schema = Joi.object({
			message: Joi.string().required(),
			walletId: Joi.string(),
		});
		await schema.validateAsync(opts);
	}

	async uploadEncryptFile(options) {
		const schema = Joi.object({
		  filePath: Joi.string().required(),
		  walletId: Joi.string(),
		  publicKey: Joi.string().required(),
		});
	
		await schema.validateAsync(options);
	  }

	async uploadFileOnOrdinal(opts) {
		const schema = Joi.object({
			filePath: Joi.string().required(),
		    walletId: Joi.string(),
		});
		await schema.validateAsync(opts);
	}

	async uploadHashedFile(opts) {
		const schema = Joi.object({
			filePath: Joi.string().required(),
		    walletId: Joi.string(),
		});
		await schema.validateAsync(opts);
	}
}

export default new Validator();
