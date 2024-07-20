/// <reference types="chrome" />
interface Port {
    postMessage: (message: any) => void;
    onMessage: {
        addListener: (listener: (response: any) => void) => void;
        removeListener: (listener: (response: any) => void) => void;
    };
}
export declare function sendMessageAndWaitForResponse(port: Port, message: any): Promise<any>;
export declare enum TAALWalletAction {
    GetAddress = "getAddress",
    GetBalance = "getBalance",
    GetRootPublicKey = "getRootPublicKey",
    GetPublicKey = "getPublicKey",
    GetNetwork = "getNetwork",
    SignTx = "signTx",
    SignPreimage = "signPreimage",
    SignMessage = "signMessage"
}
export declare function sendAction(port: chrome.runtime.Port, action: string, payload?: any): Promise<any>;
export {};
