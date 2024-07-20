import { Action } from "../../core/action";
import { RequestMethod } from "../../core/request-controller";
import { SmartContract } from '../../../smart-contract/contract';
import { ContractId } from "../../core/types";
import { UTXO } from "../../../bsv/types";
interface GetLatestInstanceRequest<T extends SmartContract> {
    clazz: new (...args: any) => T;
    contractId: ContractId;
}
type GetLatestInstanceJSONRequest = ContractId;
type GetLatestInstanceJSONResponse = UTXO[];
type GetLatestInstanceResponse<T extends SmartContract> = T;
export declare class GetLatestInstanceAction<T extends SmartContract> implements Action<GetLatestInstanceRequest<T>, GetLatestInstanceJSONRequest, GetLatestInstanceJSONResponse, GetLatestInstanceResponse<T>> {
    method: RequestMethod;
    pathPattern: string;
    serilizeRequest(request: GetLatestInstanceRequest<T>): GetLatestInstanceJSONRequest;
    deserilizeResponse(response: GetLatestInstanceJSONResponse, requestCtx: GetLatestInstanceRequest<T>): GetLatestInstanceResponse<T>;
}
export {};
