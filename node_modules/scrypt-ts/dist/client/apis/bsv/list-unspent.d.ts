import { bsv } from "scryptlib";
import { Action } from "../../core/action";
import { RequestMethod } from "../../core/request-controller";
import { UtxoQueryOptions } from "../../../bsv/abstract-provider";
import { UTXO } from "../../../bsv/types";
interface ListUnspentRequest {
    address: bsv.Address;
    options?: UtxoQueryOptions;
}
interface ListUnspentJSONRequest {
    address: string;
    options?: UtxoQueryOptions;
}
type ListUnspentJSONResponse = UTXO[];
type ListUnspentResponse = ListUnspentJSONResponse;
export declare class ListUnspentAction implements Action<ListUnspentRequest, ListUnspentJSONRequest, ListUnspentJSONResponse, ListUnspentResponse> {
    method: RequestMethod;
    pathPattern: string;
    serilizeRequest(request: ListUnspentRequest): ListUnspentJSONRequest;
    deserilizeResponse(response: ListUnspentJSONResponse, requestCtx: ListUnspentRequest): ListUnspentResponse;
}
export {};
