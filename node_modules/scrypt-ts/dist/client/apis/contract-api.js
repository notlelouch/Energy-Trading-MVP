"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractApi = void 0;
const get_latest_instance_1 = require("./contract/get-latest-instance");
const sync_hashed_props_1 = require("./contract/sync-hashed-props");
const utils_1 = require("./../utils");
const io = require('socket.io-client');
const wait = ms => new Promise(r => setTimeout(r, ms));
const retryOperation = (operation, delay, retries, reasonCallback) => new Promise((resolve, reject) => {
    return operation()
        .then(resolve)
        .catch((reason) => {
        if (retries > 0 && (reasonCallback && reasonCallback(reason) || typeof reasonCallback === 'undefined')) {
            return wait(delay)
                .then(retryOperation.bind(null, operation, delay, retries - 1))
                .then(resolve)
                .catch(reject);
        }
        return reject(reason);
    });
});
class ContractApi {
    constructor(_core) {
        this._core = _core;
    }
    /** @ignore */
    syncHashedProps(instance) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._core.actionResolver.resolve(new sync_hashed_props_1.SyncHashedPropsAction(), { instance });
        });
    }
    /**
     * Get a contract instance containing the latest state of the contract by the contract ID.
     * The obtained contract instance may also be obtained by other users at the same time.
     * If other users call this contract instance. Then the contract instance will be invalid.
     * At this time, calling the contract will cause a `txn-mempool-conflict` error (that is, UTXO double spending).
     * If this error occurs, you need to re-acquire the contract instance
     * @param clazz
     * @param contractId
     * @returns a contract instance contains latest state
     */
    getLatestInstance(clazz, contractId) {
        return __awaiter(this, void 0, void 0, function* () {
            const instance = yield retryOperation(() => {
                return this._core.actionResolver.resolve(new get_latest_instance_1.GetLatestInstanceAction(), { clazz, contractId });
            }, 3000, 10, (reason) => reason.message.includes('The utxo related to the contract was not found'));
            return instance;
        });
    }
    /**
     * Subscribe to notifications of contract status changes by contract ID,
     * @param options SubscribeOptions
     * @param cb
     * @returns a SubScription, which can be used to unsubscribe
     */
    subscribe(options, cb) {
        const self = this;
        const baseUrl = this._core.getBaseUrl();
        const apiKey = this._core.getApiKey();
        const socket = io(baseUrl, {
            path: '/streams/contract',
            query: options.id,
            auth: {
                token: apiKey
            }
        });
        let unsubscribe = () => {
            socket.close();
            self._core.events.delete(`${options.id.txId}:${options.id.outputIndex}`);
            self._core.logger.info('unsubscribe', `The connection to ${options.id.txId}:${options.id.outputIndex} has been unsubscribed.`);
        };
        socket.on('connect', function () {
            self._core.logger.info('Connected', `The connection to ${options.id.txId}:${options.id.outputIndex} has been established.`);
        });
        socket.on("connect_error", (error) => {
            self._core.logger.error('connect_error', `The connection`);
        });
        socket.on('utxoSpent', function (data) {
            return __awaiter(this, void 0, void 0, function* () {
                self._core.logger.debug('utxoSpent', `Got message ${options.id.txId}:${options.id.outputIndex}: ${data}`);
                let SCClazz = options.clazz;
                const tx = yield (0, utils_1.getTransaction)(self._core.getNetWork(), data.spentBy.txId);
                const calldata = SCClazz.parseCallData(tx, data.spentBy.inputIndex);
                if (Array.isArray(options.methodNames) && !options.methodNames.includes(calldata.methodName)) {
                    // MethodNames that users don't care about
                    return;
                }
                const nexts = Array.isArray(data.createdInSpentTxOutputs) ? data.createdInSpentTxOutputs.map(outputIndex => SCClazz.fromTx(tx, outputIndex)) : [];
                cb({
                    nexts,
                    methodName: calldata.methodName,
                    args: calldata.args.map(a => a.value),
                    tx
                });
            });
        });
        socket.on('subscribeFailed', function (errorMessage) {
            self._core.logger.error('subscribeFailed', `Subscribe contract ${options.id.txId}:${options.id.outputIndex} failed: ${errorMessage}.`);
            unsubscribe();
        });
        socket.on('error', function ({ statusCode, errorMsg }) {
            self._core.logger.error(`websocket error`, `statusCode=${statusCode}, errorMsg=${errorMsg}`);
            unsubscribe();
        });
        socket.on('disconnect', function () {
            self._core.logger.info('Disconnected', `The connection to ${options.id.txId}:${options.id.outputIndex} disconnected.`);
            self._core.events.delete(`${options.id.txId}:${options.id.outputIndex}`);
        });
        this._core.events.set(`${options.id.txId}:${options.id.outputIndex}`, socket);
        return {
            unsubscribe
        };
    }
}
exports.ContractApi = ContractApi;
//# sourceMappingURL=contract-api.js.map