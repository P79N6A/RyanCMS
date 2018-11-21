import * as Hashids from 'hashids';
import {loopKeyForValue} from './util';

const hashids = new Hashids('group_push', 16);

export class HashId {

    static encode(key: string, id: number) {
        if (/id$/.test(key)) {
            return hashids.encode(id);
        }
        return id;
    }

    static decode(key: string, hash: string) {
        if (/id$/.test(key)) {
            if (!hash) return hash;
            const numbers = hashids.decode(hash);
            if (numbers.length === 0) {
                throw new Error(key + '有误');
            }
            return numbers[0];
        }
        return hash;
    }

    static encodeToHash(id) {
        return hashids.encode(id); 
    }

    static decodeToId(hash) {
        return hashids.decode(hash); 
    }

    static transformToHash(value: any | any[]): any {
        return loopKeyForValue(value, this.encode);
    }

    static transformToId(value: any | any[]): any {
        return loopKeyForValue(value, this.decode);
    }
}
