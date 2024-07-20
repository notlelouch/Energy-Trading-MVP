import { bsv } from 'scryptlib';
import { ByteString } from '../builtins/types';
declare module 'bsv' {
    interface PublicKey {
        toByteString(): ByteString;
    }
}
export { bsv };
