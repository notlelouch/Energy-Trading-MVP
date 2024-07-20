import { bsv } from 'scryptlib';
import { ByteString } from '../builtins/types';
declare module 'bsv' {
    interface Address {
        toByteString(): ByteString;
    }
}
export { bsv };
