import { Action } from "../../core/action";
import { RequestMethod } from "../../core/request-controller";
interface GetFeePerKBRequest {
}
interface GetFeePerKBJSONRequest {
}
interface GetFeePerKBJSONResponse {
    satoshis: number;
}
type GetFeePerKBResponse = number;
export declare class GetFeePerKBAction implements Action<GetFeePerKBRequest, GetFeePerKBJSONRequest, GetFeePerKBJSONResponse, GetFeePerKBResponse> {
    method: RequestMethod;
    pathPattern: string;
    serilizeRequest(request: GetFeePerKBRequest): GetFeePerKBJSONRequest;
    deserilizeResponse(response: GetFeePerKBJSONResponse, _requestCtx: GetFeePerKBRequest): GetFeePerKBResponse;
}
export {};
