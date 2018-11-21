import {Injectable} from '@nestjs/common';
import * as Hashids from 'hashids';

@Injectable()
export class HashidService {
    private hashids: Hashids;

    constructor() {
        this.hashids = new Hashids('group_push', 16);
    }

    encode(...args: number[]) {
        return this.hashids.encode(...args);
    }

    decode(hash: string) {
        const numbers = this.hashids.decode(hash);
        if (numbers.length === 0) {
            throw new Error('您的请求有误');
        }
        return numbers[0];
    }

    decodeArray(hashes: string[]) {
        return hashes.map(hash => this.decode(hash));
    }

    encodeArray(ids: number[]) {
        return ids.map(id => this.encode(id));
    }
}
