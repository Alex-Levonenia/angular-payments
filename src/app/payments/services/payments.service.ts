import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {IPayment} from '../interfaces/payment.interface';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {
  /**
   * Url to database
   * @private
   */
  private readonly API_URL: string = 'https://payments-d8c4.restdb.io/rest/payments';

  /**
   * Creates payment service instance
   * @param http
   */
  constructor(private http: HttpClient) {
  }

  /**
   * Gets payments list from the database
   */
  getPayments(): Observable<any> {
    return this.http.get(this.API_URL);
  }

  /**
   * Adds payment to the database
   * @param payment
   */
  addPayment(payment: IPayment): Observable<any> {
    return this.http.post(this.API_URL, payment);
  }

  /**
   * Updates payment in the database
   * @param payment
   */
  updatePayment(payment: IPayment): Observable<any> {
    return this.http.put(`${this.API_URL}/${payment._id}`, payment);
  }

  /**
   * Deletes payment from the database
   * @param payment
   */
  deletePayment(payment: IPayment): Observable<any> {
    return this.http.delete(`${this.API_URL}/${payment._id}`);
  }

}
