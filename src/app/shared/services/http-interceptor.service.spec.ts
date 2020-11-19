import {HttpInterceptorService} from './http-interceptor.service';
import {HttpEvent, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable, of} from 'rxjs';

describe('HttpInterceptorService', () => {
  let service: HttpInterceptorService;
  const httpHandler = {
    handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
      return of();
    }
  } as HttpHandler;
  const request = {
    clone(newParam: HttpRequest<any> = {} as HttpRequest<any>): HttpRequest<any> {
      return newParam;
    }
  } as HttpRequest<any>;

  beforeEach(() => {
    service = new HttpInterceptorService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call clone method', () => {
    const spy = spyOn(request, 'clone');
    service.intercept(request, httpHandler);
    expect(spy).toHaveBeenCalled();
  });

  it('should call handle method', () => {
    const spy = spyOn(httpHandler, 'handle');
    service.intercept(request, httpHandler);
    expect(spy).toHaveBeenCalled();
  });
});
