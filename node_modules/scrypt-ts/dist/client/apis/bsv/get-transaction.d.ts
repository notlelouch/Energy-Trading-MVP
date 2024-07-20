import { bsv } from "scryptlib";
import { Action } from "../../core/action";
import { RequestMethod } from "../../core/request-controller";
interface GetTransactionRequest {
    txId: string;
}
type GetTransactionJSONRequest = GetTransactionRequest;
interface GetTransactionJSONResponse {
    txHex: string;
}
type GetTransactionResponse = bsv.Transaction;
export declare class GetTransactionAction implements Action<GetTransactionRequest, GetTransactionJSONRequest, GetTransactionJSONResponse, GetTransactionResponse> {
    method: RequestMethod;
    pathPattern: string;
    serilizeRequest(request: GetTransactionRequest): GetTransactionJSONRequest;
    deserilizeResponse(response: GetTransactionJSONResponse, _requestCtx: GetTransactionRequest): GetTransactionResponse;
}
export {};
