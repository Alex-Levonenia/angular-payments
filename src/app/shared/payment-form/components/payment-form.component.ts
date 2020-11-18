import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IPayment} from '../../../payments/interfaces/payment.interface';

@Component({
  selector: 'payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
})
export class PaymentFormComponent implements OnInit {

  @Output() addPayment: EventEmitter<IPayment> = new EventEmitter<IPayment>();

  public paymentForm: FormGroup;

  constructor() {
  }

  ngOnInit(): void {
    this.paymentForm = new FormGroup({
        title: new FormControl('', {validators: [Validators.required, Validators.maxLength(40)]}),
        price: new FormControl('', {validators: [Validators.min(1), Validators.max(100000)]})
      }
    );
  }

  onSubmit(form: FormGroup): void {
    if (!form.invalid) {
      this.addPayment.emit({
        title: this.paymentForm.value.title,
        price: this.paymentForm.value.price,
      } as IPayment);
      form.reset();
      form.controls.title.setErrors(null);
    }
  }
}
