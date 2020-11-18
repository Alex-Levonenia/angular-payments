import {AppComponent} from './app.component';
import {PaymentsService} from './payments/services/payments.service';
import {Observable, of} from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;

  beforeEach(() => {
    component = new AppComponent();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
});
