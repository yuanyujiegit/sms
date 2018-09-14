import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/internal/operators';


@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private http: HttpClient) {

  }

  private static formatErrors(error: any) {
    return throwError(error.error);
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(path, {params}).pipe(catchError(UtilService.formatErrors));
  }
  
  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(path, JSON.stringify(body)).pipe(catchError(UtilService.formatErrors));
  }

}
