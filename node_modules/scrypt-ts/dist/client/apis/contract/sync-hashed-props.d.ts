import { Action } from "../../core/action";
import { RequestMethod } from "../../core/request-controller";
import { SmartContract } from '../../../smart-contract/contract';
import { JSONResponseEnvelope, SerializedHashedProp } from "../../core/types";
interface SyncHashedPropsRequest<T extends SmartContract> {
    instance: T;
}
interface SyncHashedPropsJSONRequest {
    txId: string;
    outputIndex: number;
    props: SerializedHashedProp[];
}
interface SyncHashedPropsJSONResponse {
}
type SyncHashedPropsResponse = void;
export declare class SyncHashedPropsAction<T extends SmartContract> implements Action<SyncHashedPropsRequest<T>, SyncHashedPropsJSONRequest, SyncHashedPropsJSONResponse, SyncHashedPropsResponse> {
    method: RequestMethod;
    pathPattern: string;
    serilizeRequest(request: SyncHashedPropsRequest<T>): SyncHashedPropsJSONRequest;
    deserilizeResponse(response: JSONResponseEnvelope<SyncHashedPropsJSONResponse>, requestCtx: SyncHashedPropsRequest<T>): SyncHashedPropsResponse;
}
export {};
