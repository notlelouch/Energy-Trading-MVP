import { Action } from "../../core/action";
import { RequestMethod } from "../../core/request-controller";
type ConnectRequest = {};
type ConnectJSONRequest = {};
interface ConnectJSONResponse {
    status: string;
}
type ConnectResponse = {
    success: boolean;
    error: string;
};
export declare class ConnectAction implements Action<ConnectRequest, ConnectJSONRequest, ConnectJSONResponse, ConnectResponse> {
    method: RequestMethod;
    pathPattern: string;
    serilizeRequest(request: ConnectRequest): ConnectJSONRequest;
    deserilizeResponse(response: ConnectJSONResponse, _requestCtx: ConnectRequest): ConnectResponse;
}
export {};
