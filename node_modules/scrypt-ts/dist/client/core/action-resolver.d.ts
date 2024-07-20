import { Action } from "./action";
import { LoggerController } from "./logger-controller";
import { RequestController } from "./request-controller";
export declare class ActionError extends Error {
    statusCode: number;
    message: string;
    constructor(statusCode: number, message: string);
}
export declare class ActionResolver {
    private readonly _requestController;
    private readonly _loggerController;
    constructor(_requestController: RequestController, _loggerController: LoggerController);
    resolve<Request, JSONRequest, JSONResponse, Response>(action: Action<Request, JSONRequest, JSONResponse, Response>, request: Request): Promise<Response>;
}
