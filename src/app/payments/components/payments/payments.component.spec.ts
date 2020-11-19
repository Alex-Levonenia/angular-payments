import {PaymentsComponent} from './payments.component';
import {PaymentsService} from '../../services/payments.service';
import {Observable, of} from 'rxjs';
import {IPayment} from '../../interfaces/payment.interface';
import {ChangeDetectorRef} from '@angular/core';

describe('PaymentsComponent', () => {
  let component: PaymentsComponent;
  const mockPaymentsService = {
    getPayments(): Observable<any> {
      return of('');
    },
    addPayment(payment: IPayment): Observable<any> {
      return of('');
    },
    updatePayment(payment: IPayment): Observable<any> {
      return of('');
    },
    deletePayment(payment: IPayment): Observable<any> {
      return of('');
    }
  } as PaymentsService;

  const mockPayment = {title: 'test', price: 300, selectedMonthsIds: ['goodId']} as IPayment;

  const mockCDR = {
    markForCheck() {
    }
  } as ChangeDetectorRef;

  beforeEach(() => {
    component = new PaymentsComponent(mockPaymentsService, mockCDR);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set isLoading flag', () => {
    component.isLoadingData = true;
    component.ngOnInit();
    expect(component.isLoadingData).toEqual(false);
  });

  it('should call addPayment', () => {
    const spy = spyOn(mockPaymentsService, 'addPayment').and.callThrough();
    component.createPayment(mockPayment);
    expect(spy).toHaveBeenCalled();
  });

  it('should call deletePayment', () => {
    const spy = spyOn(mockPaymentsService, 'deletePayment').and.callThrough();
    component.deletePayment(mockPayment);
    expect(spy).toHaveBeenCalled();
  });

  it('should call addMonth', () => {
    const spy = spyOn(component, 'addMonthToPayment');
    component.changePaymentMonth(mockPayment, 'badId');
    expect(spy).toHaveBeenCalled();
  });

  it('should call removeMonth', () => {
    const spy = spyOn(component, 'removeMonthFromPayment');
    component.changePaymentMonth(mockPayment, 'goodId');
    expect(spy).toHaveBeenCalled();
  });

  it('should call updatePayment', () => {
    const spy = spyOn(mockPaymentsService, 'updatePayment').and.callThrough();
    component.addMonthToPayment(mockPayment, 'goodId');
    expect(spy).toHaveBeenCalled();
  });

  it('should call updatePayment and selectedMonthsIds to equal empty array', () => {
    const spy = spyOn(mockPaymentsService, 'updatePayment').and.callThrough();
    component.removeMonthFromPayment(mockPayment, 'goodId');
    expect(spy).toHaveBeenCalled();
    expect(mockPayment.selectedMonthsIds).toEqual([]);
  });
});
