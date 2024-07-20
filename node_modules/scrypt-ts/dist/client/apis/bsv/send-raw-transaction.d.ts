import { Action } from "../../core/action";
import { RequestMethod } from "../../core/request-controller";
interface SendRawTransactionRequest {
    txHex: string;
}
type SendRawTransactionJSONRequest = SendRawTransactionRequest;
interface SendRawTransactionJSONResponse {
    txId: string;
}
type SendRawTransactionResponse = string;
export declare class SendRawTransactionAction implements Action<SendRawTransactionRequest, SendRawTransactionJSONRequest, SendRawTransactionJSONResponse, SendRawTransactionResponse> {
    method: RequestMethod;
    pathPattern: string;
    serilizeRequest(request: SendRawTransactionRequest): SendRawTransactionJSONRequest;
    deserilizeResponse(response: SendRawTransactionJSONResponse, _requestCtx: SendRawTransactionRequest): SendRawTransactionResponse;
}
export {};
