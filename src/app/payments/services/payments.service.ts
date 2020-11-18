import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {IPayment} from '../interfaces/payment.interface';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {
  private API_URL: string = 'https://payments-d8c4.restdb.io/rest/payments';

  constructor(private http: HttpClient) {
  }

  getPayments(): Observable<any> {
    return this.http.get(this.API_URL);
  }

  addPayment(payment: IPayment): Observable<any> {
    return this.http.post(this.API_URL, payment);
  }

  updatePayment(payment: IPayment): Observable<any> {
    return this.http.put(`${this.API_URL}/${payment._id}`, payment);
  }

  deletePayment(payment: IPayment): Observable<any> {
    return this.http.delete(`${this.API_URL}/${payment._id}`);
  }

}
