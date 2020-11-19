import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {IPayment} from '../../interfaces/payment.interface';
import {PaymentsService} from '../../services/payments.service';
import {IMonth} from '../../../shared/interfaces/month.interface';
import {Settings} from '../../../shared/settings';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentsComponent implements OnInit {
  /**
   * List of payments to display
   */
  public payments: IPayment[];

  /**
   * List of months to display
   */
  public months: IMonth[] = Settings.MONTHS;

  /**
   * List of columns to display in the table
   */
  public columns: string[] = [];

  /**
   * Displays spinner when true
   */
  public isLoadingData: boolean = false;

  /**
   * Creates payment component instance
   * @param paymentsService
   * @param cdr
   */
  constructor(private paymentsService: PaymentsService, private cdr: ChangeDetectorRef) {
  }

  /**
   * onInit lifecycle hook.
   * Loads data and sets default value for columns
   */
  ngOnInit(): void {
    this.columns = ['title', 'price'].concat(this.months.map(month => month.title)).concat(['delete']);
    this.getPayments();
  }

  /**
   *Loads list of payments
   */
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

  /**
   * Creates a payment and reloads data
   * @param payment
   */
  createPayment(payment: IPayment): void {
    this.isLoadingData = true;
    payment.selectedMonthsIds = [];
    this.paymentsService.addPayment(payment).pipe(finalize(() => {
      this.getPayments();
    })).subscribe();
  }

  /**
   * Deletes a payment and reloads data
   * @param payment
   */
  deletePayment(payment: IPayment): void {
    this.isLoadingData = true;
    this.paymentsService.deletePayment(payment).pipe(finalize(() => {
      this.getPayments();
    })).subscribe();
  }

  /**
   * Calls add or remove month depends on including month in payment
   * @param payment
   * @param monthId
   */
  changePaymentMonth(payment: IPayment, monthId: string): void {
    if (!this.hasMonth(payment, monthId)) {
      this.addMonthToPayment(payment, monthId);
    } else {
      this.removeMonthFromPayment(payment, monthId);
    }
  }

  /**
   * Checks if payment has month id inside
   * @param payment
   * @param monthId
   */
  hasMonth(payment: IPayment, monthId: string): boolean {
    return payment.selectedMonthsIds.includes(monthId);
  }

  /**
   * Add month to payment and reloads data
   * @param payment
   * @param monthId
   */
  addMonthToPayment(payment: IPayment, monthId: string): void {
    this.isLoadingData = true;
    payment.selectedMonthsIds.push(monthId);
    this.paymentsService.updatePayment(payment).pipe(finalize(() => {
      this.getPayments();
    })).subscribe();
  }

  /**
   * Removes month from payment and reloads data
   * @param payment
   * @param monthId
   */
  removeMonthFromPayment(payment: IPayment, monthId: string): void {
    this.isLoadingData = true;
    payment.selectedMonthsIds = payment.selectedMonthsIds.filter(id => id !== monthId);
    this.paymentsService.updatePayment(payment).pipe(finalize(() => {
      this.getPayments();
    })).subscribe();
  }


}
