import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UtilService } from './util.service';
import { OrgInterface } from '../interface/orgInterface';
import {map} from 'rxjs/internal/operators';

@Injectable()
export class OrgService {

  constructor(private http: UtilService) {}
  
  getOrgList(params: any): Observable<any> {
    return this.http.get('whaleMarketMgr/orgController/bookManagerSearch', params)
      .pipe(map(data => data));
  }
  
}
