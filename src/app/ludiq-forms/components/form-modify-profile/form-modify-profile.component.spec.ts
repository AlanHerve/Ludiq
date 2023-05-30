import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormModifyProfileComponent } from './form-modify-profile.component';

describe('FormModifyProfileComponent', () => {
  let component: FormModifyProfileComponent;
  let fixture: ComponentFixture<FormModifyProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormModifyProfileComponent]
    });
    fixture = TestBed.createComponent(FormModifyProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
