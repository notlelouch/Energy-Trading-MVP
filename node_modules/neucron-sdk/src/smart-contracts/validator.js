import Joi from 'joi';

class Validator {
  constructor() {
  }

  async txAsm(opts) {
	const schema = Joi.object({
	  satoshi: Joi.number().integer().required(),
	  script: Joi.string().required()
	});
	await schema.validateAsync(opts);
  }

  async txMultiple(opts) {
	const schema = Joi.object({
	  Input: Joi.array().items(
		Joi.object({
		  Sequence_Num: Joi.number().integer().required(),
		  Output_Index: Joi.number().integer().required(),
		  Prev_Txid: Joi.string().required(),
		  Unlocking_Script: Joi.string().required(),
		}),
	  ),
	  LockTime: Joi.string().isoDate(),
	  Outputs: Joi.array().items(
		Joi.object({
		  Amount: Joi.number().integer().required(),
		  Asm: Joi.string().required(),
		}),
	  ),
	  flag: Joi.string(),
	  changeAddress: Joi.string(),
	});

	await schema.validateAsync(opts);
  }

  async txSign(opts) {
	const schema = Joi.object({
	  Input: Joi.array().items(
		Joi.object({
		  Sequence_Num: Joi.number().integer().required(),
		  Output_Index: Joi.number().integer().required(),
		  Prev_Txid: Joi.string().required(),
		  privatekey_in_Wif: Joi.string().required(),
		}),
	  ),
	  LockTime: Joi.string().isoDate(),
	  Outputs: Joi.array().items(
		Joi.object({
		  Amount: Joi.number().integer().required(),
		  Asm: Joi.string().required(),
		}),
	  ),
	  Flag: Joi.string(),
	  Change_Address: Joi.string(),
	});

	await schema.validateAsync(opts);
  }

  async txUnlock(opts) {
	const schema = Joi.object({
	  unlockingScript: Joi.string().required(),
	  prevTxID: Joi.string().required(),
	  outputIndex: Joi.number().integer().required()
	});

	await schema.validateAsync(opts);
  }

}

export default new Validator;
