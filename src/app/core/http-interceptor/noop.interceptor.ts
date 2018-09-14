import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, retry} from 'rxjs/internal/operators';
import { throwError } from 'rxjs';
import { LocalStorageService } from 'angular-2-local-storage';

/**
 * name: 拦截器
 * author: shandian
 * date: 2018/8/28
 * 参考文档：https://www.angular.cn/guide/http#intercepting-requests-and-responses
 * */
@Injectable()
export class NoopInterceptor implements HttpInterceptor {

  static handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.'
    );
  }

  constructor(private localStorageService: LocalStorageService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    const token = this.localStorageService.get('accessToken');
    if (token) {
      headersConfig['accessToken'] = token;
    }

    const customerRequest = req.clone({
      setHeaders: headersConfig
    });

    return next.handle(customerRequest).pipe(
      retry(1),       /*失败时重试1次*/
      catchError(NoopInterceptor.handleError)
    );

  }


}
