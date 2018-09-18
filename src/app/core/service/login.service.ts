import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';

import { UtilService } from './util.service';
import { map , distinctUntilChanged } from 'rxjs/internal/operators';
import { LoginInterface } from '../interface';

@Injectable()
export class LoginService {
  private currentLoginSubject = new BehaviorSubject<any>({} as LoginInterface);
  public currentLogin = this.currentLoginSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(
    private http: UtilService
  ) {}

  setAuth(user: LoginInterface) {
    this.currentLoginSubject.next(user);
    this.isAuthenticatedSubject.next(true);
  }
  
  login(params): Observable<LoginInterface> {
    return this.http.post('whaleMarketMgr/user/login', params)
      .pipe(map(data => {
         // this.currentLogin.next(data);
        return data;
      }
    ));
  }
  
  out(params, query) {
    return this.http.post('whaleMarketMgr/user/logout' + query, params)
      .pipe(map(data => {
         // this.currentLogin.next(data);
        return data;
      }
    ));
  }
}
