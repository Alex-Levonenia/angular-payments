import {AppComponent} from './app.component';
import {PaymentsService} from './payments/services/payments.service';
import {Observable, of} from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  const mockPaymentService = {
    getPayments(): Observable<any> {
      return of('');
    }
  } as PaymentsService;

  beforeEach(() => {
    component = new AppComponent(mockPaymentService);
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
});
