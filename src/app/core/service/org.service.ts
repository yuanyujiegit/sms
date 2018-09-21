import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UtilService } from './util.service';

@Injectable()
export class OrgService {

  constructor(private http: UtilService) {}
  
  getOrgList(params: any): Observable<any> {
    return this.http.get('whaleMarketMgr/orgController/selectWithApply', params);
  }
  
  editOrg(params: Object): Observable<any> {
    return this.http.post('whaleMarketMgr/orgController/editOrg', params);
  }
  
}
