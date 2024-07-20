import { bsv } from 'scryptlib';
import { ByteString } from '../builtins/types';
declare module 'bsv' {
    namespace crypto {
        interface Sig {
            toByteString(): ByteString;
        }
    }
}
export { bsv };
