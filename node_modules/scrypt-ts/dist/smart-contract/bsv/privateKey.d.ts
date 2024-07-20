import { bsv } from 'scryptlib';
import { ByteString } from '../builtins/types';
declare module 'bsv' {
    interface PrivateKey {
        toByteString(): ByteString;
    }
}
export { bsv };
