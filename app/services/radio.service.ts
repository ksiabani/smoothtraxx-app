import {Injectable} from 'angular2/core'
import {Http} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

//import {Radio} from './radio';
//import {RADIO} from './mock-radio';

@Injectable()
export class RadioService {
    constructor(
        public http: Http) {
    }

    getStats() {
        return this.http.get('http://broadcast.smoothtraxx.gr:8000/status-json.xsl')
            .map(res => res.json());
    }

    handleError(error) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}
