import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCreateAccountComponent } from './form-create-account.component';

describe('FormCreateAccountComponent', () => {
  let component: FormCreateAccountComponent;
  let fixture: ComponentFixture<FormCreateAccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormCreateAccountComponent]
    });
    fixture = TestBed.createComponent(FormCreateAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
