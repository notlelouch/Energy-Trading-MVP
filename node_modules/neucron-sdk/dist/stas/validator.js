import Joi from 'joi';
class Validator {
  /**
   * Validates asset creation data.
   * @param {Object} options - The data for asset creation.
   * @throws {Error} Throws an error if the data is invalid.
   */
  async transferAsset(options) {
    const schema = Joi.object({
      asset_id: Joi.string().required(),
      split_destinations: Joi.array().items(Joi.object({
        address: Joi.string().required(),
        amount: Joi.number().required()
      }))
    }).required();
    await schema.validateAsync(options);
  }

  /**
   * Validates asset creation data.
   * @param {Object} options - The data for asset creation.
   * @throws {Error} Throws an error if the data is invalid.
   */
  async transferAllAssets(options) {
    const schema = Joi.object({
      holding_address: Joi.string().required(),
      split_destinations: Joi.array().items(Joi.object({
        address: Joi.string().required(),
        amount: Joi.number().required()
      })),
      symbol: Joi.string().required()
    }).required();
    await schema.validateAsync(options);
  }
  async assetData(options) {
    const schema = Joi.object({
      data: Joi.object().required(),
      decimals: Joi.number().integer().required(),
      description: Joi.string().required(),
      image: Joi.string().required(),
      name: Joi.string().required(),
      properties: Joi.object({
        issuer: Joi.object({
          email: Joi.string().email().required(),
          governingLaw: Joi.string().required(),
          issuerCountry: Joi.string().required(),
          jurisdiction: Joi.string().required(),
          legalForm: Joi.string().required(),
          organisation: Joi.string().required()
        }).required(),
        legal: Joi.object({
          licenceId: Joi.string().required(),
          terms: Joi.string().required()
        }).required(),
        meta: Joi.object({
          legal: Joi.object({
            terms: Joi.string().required()
          }).required(),
          media: Joi.array().items(Joi.object({
            URI: Joi.string().required(),
            altURI: Joi.string().required(),
            type: Joi.string().required()
          })),
          schemaId: Joi.string().required(),
          website: Joi.string().required()
        }).required()
      }).required(),
      protocolId: Joi.string().required(),
      satsPerToken: Joi.number().required(),
      splitable: Joi.boolean().required(),
      symbol: Joi.string().required(),
      totalSupply: Joi.number().required()
    }).required();
    await schema.validateAsync(options);
  }

  /**
   * return status of asset.
   * @param {Object} options - The data for asset creation.
   * @param {string} options.tokenId tokenId of the Asset you wanna fetch status of
   * @throws {Error} Throws an error if the data is invalid.
   */
  async assetStatus(options) {
    const schema = Joi.object({
      tokenId: Joi.string().required()
    }).required();
    await schema.validateAsync(options);
  }

  /**
   * get Tokens by address
   * @param {Object} options - The data for asset creation.
   * @param {string} options.address address of the wallet you want to fetch tokens of
   * @throws {Error} Throws an error if the data is invalid.
   */
  async getTokensByAddress(options) {
    const schema = Joi.object({
      address: Joi.string().required()
    }).required();
    await schema.validateAsync(options);
  }
}
export default new Validator();