import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  /**
   * Intercepts http request to past custom header for the database
   * @param req
   * @param next
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const httpRequest = req.clone({
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'x-apikey': '5fb3c2d98639597288385496',
        'cache-control': 'no-cache'
      })
    });
    return next.handle(httpRequest);
  }
}
