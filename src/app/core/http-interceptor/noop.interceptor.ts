import {Injectable} from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpResponse,
  HttpHeaderResponse
} from '@angular/common/http';
import {merge, Observable, of} from 'rxjs';
import {catchError, mergeMap } from 'rxjs/internal/operators';
import { throwError } from 'rxjs';
import { LocalStorageService } from 'angular-2-local-storage';
import { Router } from '@angular/router';

/**
 * name: 拦截器
 * author: shandian
 * date: 2018/8/28
 * 参考文档：https://www.angular.cn/guide/http#intercepting-requests-and-responses
 * error: https://stackoverflow.com/questions/47869196/angular-4-http-request-error-you-provided-undefined-where-a-stream-was-expe
 * */
@Injectable()
export class NoopInterceptor implements HttpInterceptor {
  
  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpHeaderResponse | HttpResponse<any>> {

    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
    
    const token = this.localStorageService.get('accessToken');
  
    let customerRequest = req.clone({
      setHeaders: headersConfig,
    });
    
    let url: string;
    
    if (req.url.indexOf('?') > -1) {
      url = req.url + `&accessToken=${token}`;
    } else {
      url = req.url + `?accessToken=${token}`;
    }

    if (token) {
      customerRequest = req.clone({
        setHeaders: headersConfig,
        url: url
      });
    }

    return next.handle(customerRequest).pipe( mergeMap((event: any) => {
      if (event instanceof HttpResponse) {
        return this.handleData(event);
      }
      return of(event);
    }),
    catchError((error: HttpErrorResponse) => this.handleData(error))
    );
  }
  
  private handleData(event: HttpResponse<any> | HttpErrorResponse): Observable<any> {
    // 业务处理：一些通用操作
    switch (event.status) {
      case 200:
        if (event instanceof HttpResponse) {
          const body: any = event.body;
          if (body && body.code === 42103) {
            this.router.navigateByUrl('/login');
          } else {
            return of(event);
          }
        }
        break;
      case 401: // 未登录状态码
        this.router.navigateByUrl('/login');
        break;
      default:
        return of(event);
    }
  }
  
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.log(
        `Backend returned code ${error.status}, ` +
        `body was: ${error}`);
    }
    return throwError(
      'Something bad happened; please try again later.'
    );
  }
  
}
