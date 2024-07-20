"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.P2PKH = void 0;
const scryptlib_1 = require("scryptlib");
const contract_1 = require("../contract");
const decorators_1 = require("../decorators");
const functions_1 = require("./functions");
const types_1 = require("./types");
class P2PKH extends contract_1.SmartContract {
    constructor(addr) {
        super(...arguments);
        this.addr = addr;
    }
    unlock(sig, pubkey) {
        (0, functions_1.assert)((0, functions_1.pubKey2Addr)(pubkey) == this.addr, 'public key hashes are not equal');
        (0, functions_1.assert)(this.checkSig(sig, pubkey), 'signature check failed');
    }
    get lockingScript() {
        return new scryptlib_1.bsv.Script('')
            .add(scryptlib_1.bsv.Opcode.OP_DUP)
            .add(scryptlib_1.bsv.Opcode.OP_HASH160)
            .add(scryptlib_1.bsv.Script.fromASM(this.addr))
            .add(scryptlib_1.bsv.Opcode.OP_EQUALVERIFY)
            .add(scryptlib_1.bsv.Opcode.OP_CHECKSIG);
    }
}
exports.P2PKH = P2PKH;
__decorate([
    (0, decorators_1.prop)(),
    __metadata("design:type", String)
], P2PKH.prototype, "addr", void 0);
__decorate([
    (0, decorators_1.method)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], P2PKH.prototype, "unlock", null);
const desc = {
    version: 9,
    compilerVersion: '1.19.0+commit.72eaeba',
    contract: 'P2PKH',
    md5: '0c046dfb1f1a91cf72b9a852537bdfe1',
    structs: [],
    library: [],
    alias: [],
    abi: [
        {
            type: 'function',
            name: 'unlock',
            index: 0,
            params: [
                {
                    name: 'sig',
                    type: 'Sig',
                },
                {
                    name: 'pubkey',
                    type: 'PubKey',
                },
            ],
        },
        {
            type: 'constructor',
            params: [
                {
                    name: 'addr',
                    type: 'Ripemd160',
                },
            ],
        },
    ],
    stateProps: [],
    buildType: 'release',
    file: '',
    hex: '76a9<addr>88ac',
    sourceMapFile: '',
};
P2PKH.loadArtifact(desc);
//# sourceMappingURL=p2pkh.js.map