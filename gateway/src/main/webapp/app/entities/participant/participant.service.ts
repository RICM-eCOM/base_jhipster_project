import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Participant } from './participant.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ParticipantService {

    private resourceUrl = 'microservice1/api/participants';
    private resourceUrl2 = 'microservice1/api/participants/byuser';

    constructor(private http: Http) { }

    create(participant: Participant): Observable<Participant> {
        const copy = this.convert(participant);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(participant: Participant): Observable<Participant> {
        const copy = this.convert(participant);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<Participant> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            return res.json();
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    getByUserName(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl2, options)
            .map((res: Response) => this.convertResponse(res));
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convert(participant: Participant): Participant {
        const copy: Participant = Object.assign({}, participant);
        return copy;
    }
}
