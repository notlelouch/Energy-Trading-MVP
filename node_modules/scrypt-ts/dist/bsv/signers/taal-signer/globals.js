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
exports.sendAction = exports.TAALWalletAction = exports.sendMessageAndWaitForResponse = void 0;
const requestQueue = [];
const processQueue = () => __awaiter(void 0, void 0, void 0, function* () {
    if (requestQueue.length === 0) {
        return;
    }
    const currentItem = requestQueue[0];
    try {
        const response = yield currentItem.request();
        currentItem.resolve(response);
    }
    catch (error) {
        currentItem.reject(error);
    }
    finally {
        requestQueue.shift();
        processQueue();
    }
});
let currentRequestId = 0;
function sendMessageAndWaitForResponse(port, message) {
    return new Promise((resolve, reject) => {
        const requestId = currentRequestId++;
        message.requestId = requestId;
        const request = () => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                // Send the message
                port.postMessage(message);
                // Set up the response listener
                function listener(response) {
                    if (response.requestId !== requestId) {
                        // Ignore the response if it doesn't match the request ID
                        return;
                    }
                    // Remove the listener after receiving the response
                    port.onMessage.removeListener(listener);
                    // Resolve the Promise with the response
                    resolve(response);
                }
                port.onMessage.addListener(listener);
                // Set up a timeout to reject the Promise if there's no response after a specified time
                setTimeout(() => {
                    // Remove the listener if it's still active
                    port.onMessage.removeListener(listener);
                    // Reject the Promise with an error
                    reject(new Error('Timeout waiting for response'));
                }, 10000); // 10 seconds timeout
            });
        });
        requestQueue.push({ request, resolve, reject });
        if (requestQueue.length === 1) {
            processQueue();
        }
    });
}
exports.sendMessageAndWaitForResponse = sendMessageAndWaitForResponse;
var TAALWalletAction;
(function (TAALWalletAction) {
    TAALWalletAction["GetAddress"] = "getAddress";
    TAALWalletAction["GetBalance"] = "getBalance";
    TAALWalletAction["GetRootPublicKey"] = "getRootPublicKey";
    TAALWalletAction["GetPublicKey"] = "getPublicKey";
    TAALWalletAction["GetNetwork"] = "getNetwork";
    TAALWalletAction["SignTx"] = "signTx";
    TAALWalletAction["SignPreimage"] = "signPreimage";
    TAALWalletAction["SignMessage"] = "signMessage";
})(TAALWalletAction || (exports.TAALWalletAction = TAALWalletAction = {}));
function sendAction(port, action, payload) {
    return __awaiter(this, void 0, void 0, function* () {
        const message = payload ? { action, payload } : { action };
        const response = yield sendMessageAndWaitForResponse(port, message);
        if (response.action === 'error') {
            throw new Error(response.payload.reason);
        }
        return response;
    });
}
exports.sendAction = sendAction;
//# sourceMappingURL=globals.js.map