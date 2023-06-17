import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCreateOrganizationComponent } from './form-create-organization.component';

describe('FormCreateOrganizationComponent', () => {
  let component: FormCreateOrganizationComponent;
  let fixture: ComponentFixture<FormCreateOrganizationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormCreateOrganizationComponent]
    });
    fixture = TestBed.createComponent(FormCreateOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
