import {Injectable} from 'angular2/core'
import {Http} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

//import {Radio} from './radio';
//import {RADIO} from './mock-radio';

@Injectable()
export class RadioService {
    
    constructor(public http: Http) {}

    getStats() {
        return this.http.get('http://broadcast.smoothtraxx.gr:8000/status-json.xsl')
            .map(res => res.json())
            .catch(this.handleError);
    }

    pollStats() {
        return Observable
            .interval(5000)
            .flatMap(() => this.getStats());
    }

    getSongInfo(artist, title, album) {
        return this.http.get(`http://smoothtraxx-api.herokuapp.com/api/tracks?conditions={"artist":"${artist}","title":"${title}","album":"${album}"}`)
            .map(res => res.json())
            .catch(this.handleError);
    }

    // TODO: Do I need this?
    handleError(error) {
        console.error(error);
        // return Observable.throw(error.json().error || 'Server error');
        return Observable.throw(error || 'Server error');
    }


}
