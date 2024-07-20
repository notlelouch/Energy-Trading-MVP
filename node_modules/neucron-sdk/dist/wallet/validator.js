import Joi from 'joi';
class Validator {
  async createWallet(options) {
    const schema = Joi.object({
      walletName: Joi.string().required(),
      mnemonic: Joi.string(),
      appId: Joi.string()
    });
    await schema.validateAsync(options);
  }
  async setDefaultWallet(options) {
    const schema = Joi.object({
      walletId: Joi.string().required()
    });
    await schema.validateAsync(options);
  }
}
export default new Validator();