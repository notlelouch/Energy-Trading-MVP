import Authentication from './authentication/index.js';
import Pay from './pay/index.js';
import Wallet from './wallet/index.js';
import SmartContracts from './smart-contracts/index.js';
import DataIntegrity from './data-integrity/index.js';
import Stas from './stas/index.js';
import Team from './team/index.js';
import Assetyzer from './assetyzer/index.js';
import Paymail from './paymail/index.js';
import DigitalSignature from './digital-signature/index.js'

class NeucronSDK {
	constructor(config) {
		this.authentication = new Authentication(config);
		this.wallet = new Wallet(this.authentication);
		this.pay = new Pay(this.authentication);
		this.smartContracts = new SmartContracts(this.authentication);
		this.dataIntegrity = new DataIntegrity(this.authentication);
		this.stas = new Stas(this.authentication);
		this.team = new Team(this.authentication);
		this.assetyzer = new Assetyzer(this.authentication);
		this.paymail = new Paymail(this.authentication);
		this.digitalsignature = new DigitalSignature(this.authentication);
	}
}

export default NeucronSDK;
