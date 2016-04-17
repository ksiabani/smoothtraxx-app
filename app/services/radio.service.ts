import {Injectable} from 'angular2/core';
import {Radio} from './radio';
import {RADIO} from './mock-radio';

@Injectable()
export class RadioService {
    getStats() {
        return Promise.resolve(RADIO);
    }
    // See the "Take it slow" appendix
    getStatsSlowly() {
        return new Promise<Radio>(resolve =>
            setTimeout(()=>resolve(RADIO), 2000) // 2 seconds
        );
    }
}
