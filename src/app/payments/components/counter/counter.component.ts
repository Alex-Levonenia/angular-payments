import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {IPayment} from '../../interfaces/payment.interface';
import {IMonth} from '../../../shared/interfaces/month.interface';
import {Settings} from '../../../shared/settings';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterComponent implements OnInit {
  /**
   * List of displayed payments
   */
  @Input()
  payments: IPayment[];

  /**
   * Value to display summary spending for all payments
   */
  public sum: number = 0;
  /**
   * List of all months with days numbers, titles and randomized ids.
   * @private
   */
  private months: IMonth[] = Settings.MONTHS;

  /**
   * Creates counter component instance
   */
  constructor() {
  }

  /**
   * onInit lifecycle hook
   */
  ngOnInit(): void {
    this.countSum(this.payments);
  }

  /**
   * Counts sum of all payments prices
   * @param payments
   */
  countSum(payments: IPayment[]): void {
    this.sum = 0;
    payments.forEach(payment => {
      payment.selectedMonthsIds.forEach(monthId => {
        const month: IMonth = this.months.find(month => month.id === monthId);
        if (month) {
          this.sum += month.days * payment.price;
        }
      });
    });
  }

}
