import Request from '../request.js';

class Team {

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
   * Lets a user create team with email, team_name and team_desc.
   * @param {string} options.team_desc - team_desc of team.
   * @param {string} options.email - email of team.
   * @param {string} options.team_name - team_name of team.
   * @throws {Error} Throws an error if the transaction request fails.
   * @return {Object} The headers of the response if successful.
   */
  async createTeam(options) {
	try {
	  // Validate the SDK state
	  await this.validate();
  
	  // Ensure the walletName is provided
	  if (!options.team_name && !options.team_desc && !options.email) {
		throw new Error('Team name , Team desc & email is required for team creation.');
	  }

	  const endpoint = '/team';
  
	  const requestBody = {
        "email": options.email,
        "team_desc": options.team_desc,
        "team_name": options.team_name
      };
  
	  const requestHeaders = {
		Authorization: this.auth.getAuthToken(),
	  };

  
	  // Make the POST request to create the wallet
	  const response = await this.request.postRequest(endpoint, requestBody, requestHeaders);
  
	  // Handle errors, if any
	  if (response instanceof Error) {
		throw response;
	  }
  
	  // Return the wallet ID from the response data
	  return await response;
	} catch (error) {
	  throw new Error('Wallet creation failed: ' + error);
	}
  }

  /**
   * Lets a user update team with  name and desc.
   * @param {string} options.business_address - team_desc of team.
   * @param {string} options.business_name - team_name of team.
   * @param {string} options.business_type - team_desc of team.
   * @param {string} options.cin_number - team_name of team.
   * @param {string} options.digi_signature - team_desc of team.
   * @param {string} options.id_prov_public_key - team_name of team.
   * @param {string} options.jurisdiction - team_desc of team.
   * @param {string} options.merchant_code - team_name of team.
   * @param {string} options.uid - team_name of team.
   * @param {string} options.teamId - team_name of team.
   * @throws {Error} Throws an error if the transaction request fails.
   * @return {Object} The headers of the response if successful.
   */
  async updateTeamKyb(options) {
    try {

      await this.validate();


      const endpoint = '/team/kyb';
  
      const requestBody = {
        "business_address": options.business_address,
        "business_name": options.business_name,
        "business_type": options.business_type,
        "cin_number": options.cin_number,
        "digi_signature": options.digi_signature,
        "id_prov_public_key": options.id_prov_public_key,
        "jurisdiction": options.jurisdiction,
        "merchant_code": options.merchant_code,
        "uid": options.uid
      };
  
      const requestHeaders = {
        Authorization: this.auth.getAuthToken(),
      };

      const requestUrl = endpoint + '?' + 'teamID=' + options.teamId;

      const response = await this.request.postRequest(requestUrl, requestBody, requestHeaders);
  
      if (response instanceof Error) {
        throw response;
      }
  
      return await response;
    } catch (error) {
      throw new Error('Wallet creation failed: ' + error);
    }
  }

    /**
   * Lets a user to get Team KYB Detail
   * @param {string} [options.teamId] .
   * @throws {Error} Throws an error if the transaction request fails.
   * @return {Object} The headers of the response if successful.
   */
    async getTeamKybDetail(options) {

        try {
          await this.validate();
    
          const endpoint = '/team/kyb';
          const requestHeaders = {
            Authorization: this.auth.getAuthToken()
          };
    
          const requestUrl = endpoint + '?' + 'teamID=' + options.teamId;
          const response = await this.request.getRequest(requestUrl, requestHeaders);
    
          if (response instanceof Error) {
            throw response;
          }
          return response;
        } catch (error) {
          throw new Error('Authentication request failed: ' + error);
        }
      }
  

    /**
   * Lets a user to get Team List
   * @throws {Error} Throws an error if the transaction request fails.
   * @return {Object} The headers of the response if successful.
   */
    async getTeamList() {

        try {
          await this.validate();
    
          const endpoint = '/team/list';
          const requestHeaders = {
            Authorization: this.auth.getAuthToken()
          };

          const response = await this.request.getRequest(endpoint, requestHeaders);
    
          if (response instanceof Error) {
            throw response;
          }
          return response;
        } catch (error) {
          throw new Error('Get Team List ' + error);
        }
      }

}

export default Team;
