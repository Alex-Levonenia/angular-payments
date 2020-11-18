import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CounterComponent} from './counter.component';
import {IPayment} from '../interfaces/payment.interface';
import {Settings} from '../../shared/settings';

describe('CounterComponent', () => {
  let component: CounterComponent;
  let fixture: ComponentFixture<CounterComponent>;
  let months = Settings.MONTHS;
  let mockPayments = [{
    _id: 'q1w2e3',
    title: 'Test',
    price: 100, selectedMonthsIds: ['f304b001-31a8-482c-8f52-0ad9136fa14f']
  }] as IPayment[];

  beforeEach(() => {
    component = new CounterComponent();
    months = Settings.MONTHS;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call countSum', () => {
    const spy = spyOn(component, 'countSum');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should set sum 3000', () => {
    mockPayments.forEach(payment => payment.selectedMonthsIds = ['f304b001-31a8-482c-8f52-0ad9136fa14f']);
    component.countSum(mockPayments);
    expect(component.sum).toEqual(3000);
  });

  it('should set sum 0 with no months', () => {
    mockPayments.forEach(payment => payment.selectedMonthsIds = []);
    component.countSum(mockPayments);
    expect(component.sum).toEqual(0);
  });

  it('should set sum 0 with wrong monthId', () => {
    mockPayments.forEach(payment => payment.selectedMonthsIds = ['badId']);
    component.countSum(mockPayments);
    expect(component.sum).toEqual(0);
  });
});
