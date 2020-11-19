import {PaymentsService} from './payments.service';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {IPayment} from '../interfaces/payment.interface';

describe('PaymentService', () => {
  let service: PaymentsService;
  const mockHttpService = {
    get(url: string): Observable<any> {
      return of('testString');
    },
    post(url: string, body: any): Observable<any> {
      return of('testString');
    },
    put(url: string, body: any): Observable<any> {
      return of('testString');
    },
    delete(url: string): Observable<any> {
      return of('testString');
    }
  } as HttpClient;

  beforeEach(() => {
    service = new PaymentsService(mockHttpService);
  });

  it('should call get method', () => {
    const spy = spyOn(mockHttpService, 'get');
    service.getPayments();
    expect(spy).toHaveBeenCalled();
  });

  it('should call add method', () => {
    const spy = spyOn(mockHttpService, 'post');
    service.addPayment({} as IPayment);
    expect(spy).toHaveBeenCalled();
  });

  it('should call update method', () => {
    const spy = spyOn(mockHttpService, 'put');
    service.updatePayment({} as IPayment);
    expect(spy).toHaveBeenCalled();
  });

  it('should call delete method', () => {
    const spy = spyOn(mockHttpService, 'delete');
    service.deletePayment({} as IPayment);
    expect(spy).toHaveBeenCalled();
  });
});
