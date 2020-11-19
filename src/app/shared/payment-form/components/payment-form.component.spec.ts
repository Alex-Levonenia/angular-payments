import {PaymentFormComponent} from './payment-form.component';
import {FormGroup, ValidationErrors} from '@angular/forms';

describe('PaymentFormComponent', () => {
  let component: PaymentFormComponent;
  const testForm = {
    reset(value?: any, options?: { onlySelf?: boolean; emitEvent?: boolean }) {
    },
    controls: {
      title: {
        setErrors(errors: ValidationErrors | null, opts?: { emitEvent?: boolean }) {
        }
      }
    }
  } as any;

  beforeEach(() => {
    component = new PaymentFormComponent();
    component.ngOnInit();
    component.paymentForm.value.price = 300;
    component.paymentForm.value.title = 'test';
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onSubmit', () => {
    testForm.invalid = false;
    const spy = spyOn(testForm, 'reset');
    component.onSubmit(testForm);
    expect(spy).toHaveBeenCalled();
  });

  it('shouldnt call onSubmit', () => {
    testForm.invalid = true;
    const spy = spyOn(testForm, 'reset');
    component.onSubmit(testForm);
    expect(spy).not.toHaveBeenCalled();
  });
});
