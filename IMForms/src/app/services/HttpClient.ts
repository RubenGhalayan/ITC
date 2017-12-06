import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Rx';
import { Res } from './_models/res';
import { Router } from '@angular/router';
import { URLSearchParams } from '@angular/http';


@Injectable()
export class HttpClient {
    private jwt() {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        if (localStorage.getItem('token')) {
            headers.append('Token', localStorage.getItem('token'));
            return new RequestOptions({ headers: headers });
        }
        headers.append('Token', 'no token');
        return new RequestOptions({ headers: headers });
    }

    constructor(private http: Http, private router: Router) { }

    Post(path, data): Observable<any> {
        const body = JSON.stringify(data);
        return this.http.post(path, body, this.jwt())
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw('Server error'));
    }

    put(path, data): Observable<any> {
        const body = JSON.stringify(data);
        return this.http.put(path, body, this.jwt())
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw('Server error'));
    }

    Get(path): Observable<any> {
        return this.http.get(path, this.jwt())
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw('Server error'));
    }

    Delete(path): Observable<any> {
        return this.http.delete(path, this.jwt())
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw('Server error'));
    }

    Put(path, data): Observable<any> {
        const body = JSON.stringify(data);
        return this.http.put(path, body, this.jwt())
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw('Server error'));
    }
}
