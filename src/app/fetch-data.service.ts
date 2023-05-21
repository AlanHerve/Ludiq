import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpClientModule} from "@angular/common/http";

import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class FetchDataService {

   optionRequete = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin':'*',
      'mon-entete-personnalise':'maValeur'
    })
  };

  baseUrl : string = 'http://localhost/Backend';
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(`${this.baseUrl}/list`).pipe(
        map((res: any) => {
          return res['data'];
        })
    )
  }
}
