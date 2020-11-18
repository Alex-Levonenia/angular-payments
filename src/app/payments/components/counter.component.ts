import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {IPayment} from '../interfaces/payment.interface';
import {IMonth} from '../../shared/interfaces/month.interface';
import {Settings} from '../../shared/settings';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterComponent implements OnInit {
  @Input() payments: IPayment[];
  public sum: number = 0;
  private months: IMonth[] = Settings.MONTHS;

  constructor() {
  }

  ngOnInit(): void {
    this.countSum(this.payments);
  }

  countSum(payments: IPayment[]): void {
    this.sum = 0;
    payments.forEach(payment => {
      payment.selectedMonthsIds.forEach(monthId => {
        const month: IMonth = this.months.find(month => month.id === monthId);
        this.sum += month.days * payment.price;
      });
    });
  }

}
