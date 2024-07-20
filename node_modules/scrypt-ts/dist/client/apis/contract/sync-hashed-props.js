"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyncHashedPropsAction = void 0;
const decorators_1 = require("../../../smart-contract/decorators");
const hashed_map_1 = require("../../../smart-contract/builtins/hashed-map");
const types_1 = require("../../../smart-contract/builtins/types");
;
// monkey patch BigInt.toJSON as recommended by https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt#use_within_json
BigInt.prototype.toJSON = function () { return this.toString(); };
class SyncHashedPropsAction {
    constructor() {
        this.method = 'POST';
        this.pathPattern = '/contract/syncHashedProps?txId=:txId&outputIndex=:outputIndex';
    }
    serilizeRequest(request) {
        const instance = request.instance;
        const serializedProps = (Reflect.getMetadata(decorators_1.PropsMetaKey, instance) || []).filter((propName) => {
            return instance[propName] instanceof hashed_map_1.HashedMap || instance[propName] instanceof types_1.HashedSet;
        }).map((propName) => {
            let value = instance[propName];
            let type = undefined;
            if (instance[propName] instanceof hashed_map_1.HashedMap || instance[propName] instanceof types_1.HashedSet) {
                value = Array.from(instance[propName].entries());
                type = instance[propName]._type;
            }
            return {
                name: propName,
                type: instance[propName] instanceof hashed_map_1.HashedMap ? 'HashedMap' : 'HashedSet',
                value
            };
        });
        const utxo = instance.utxo;
        return {
            txId: utxo.txId,
            outputIndex: utxo.outputIndex,
            props: serializedProps
        };
    }
    deserilizeResponse(response, requestCtx) {
        return;
    }
}
exports.SyncHashedPropsAction = SyncHashedPropsAction;
//# sourceMappingURL=sync-hashed-props.js.map