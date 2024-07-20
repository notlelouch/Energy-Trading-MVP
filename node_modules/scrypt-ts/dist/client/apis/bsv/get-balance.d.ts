import { bsv } from "scryptlib";
import { Action } from "../../core/action";
import { RequestMethod } from "../../core/request-controller";
interface GetBalanceRequest {
    address: bsv.Address;
}
interface GetBalanceJSONRequest {
    address: string;
}
interface GetBalanceJSONResponse {
    confirmed: number;
    unconfirmed: number;
}
type GetBalanceResponse = GetBalanceJSONResponse;
export declare class GetBalanceAction implements Action<GetBalanceRequest, GetBalanceJSONRequest, GetBalanceJSONResponse, GetBalanceResponse> {
    method: RequestMethod;
    pathPattern: string;
    serilizeRequest(request: GetBalanceRequest): GetBalanceJSONRequest;
    deserilizeResponse(response: GetBalanceJSONResponse, _requestCtx: GetBalanceRequest): GetBalanceResponse;
}
export {};
