import { Component } from '@angular/core';
import {PaymentsService} from './payments/services/payments.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-payments';

  constructor(paymentService: PaymentsService) {
  }

  testMeMethod(param: number): number {
    return param**2;
  }
}
