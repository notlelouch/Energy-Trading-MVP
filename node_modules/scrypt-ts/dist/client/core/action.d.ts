import { RequestMethod } from "./request-controller";
export interface Action<Request, JSONRequest, JSONResponse, Response> {
    method: RequestMethod;
    pathPattern: string;
    serilizeRequest(request: Request): JSONRequest;
    deserilizeResponse(response: JSONResponse, requestCtx: Request): Response;
}
