import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {IPayment} from '../interfaces/payment.interface';
import {PaymentsService} from '../services/payments.service';
import {IMonth} from '../../shared/interfaces/month.interface';
import {Settings} from '../../shared/settings';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentsComponent implements OnInit {
  public payments: IPayment[];
  public months: IMonth[] = Settings.MONTHS;
  public columns = ['title', 'price'].concat(this.months.map(month => month.title)).concat(['delete']);
  public isLoadingData: boolean = false;

  constructor(private paymentsService: PaymentsService, private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.getPayments();
  }

  getPayments(): void {
    this.isLoadingData = true;
    this.paymentsService.getPayments()
      .pipe(
        finalize(() => {
            this.isLoadingData = false;
            this.cdr.markForCheck();
          }
        )).subscribe(result => {
      this.payments = result;
    });
  }

  createPayment(payment: IPayment): void {
    this.isLoadingData = true;
    payment.selectedMonthsIds = [];
    this.paymentsService.addPayment(payment).pipe(finalize(() => {
      this.getPayments();
    })).subscribe();
  }

  deletePayment(payment: IPayment): void {
    this.isLoadingData = true;
    this.paymentsService.deletePayment(payment).pipe(finalize(() => {
      this.getPayments();
    })).subscribe();
  }

  changePaymentMonth(payment: IPayment, monthId: string): void {
    if (!this.hasMonth(payment, monthId)) {
      this.addMonthToPayment(payment, monthId);
    } else {
      this.removeMonthFromPayment(payment, monthId);
    }
  }

  hasMonth(payment: IPayment, monthId: string): boolean {
    return payment.selectedMonthsIds.includes(monthId);
  }

  addMonthToPayment(payment: IPayment, monthId: string): void {
    this.isLoadingData = true;
    payment.selectedMonthsIds.push(monthId);
    this.paymentsService.updatePayment(payment).pipe(finalize(() => {
      this.getPayments();
    })).subscribe();
  }

  removeMonthFromPayment(payment: IPayment, monthId: string): void {
    this.isLoadingData = true;
    payment.selectedMonthsIds = payment.selectedMonthsIds.filter(id => id !== monthId);
    this.paymentsService.updatePayment(payment).pipe(finalize(() => {
      this.getPayments();
    })).subscribe();
  }


}
