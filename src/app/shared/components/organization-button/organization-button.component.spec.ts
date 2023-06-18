import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationButtonComponent } from './organization-button.component';

describe('OrganizationButtonComponent', () => {
  let component: OrganizationButtonComponent;
  let fixture: ComponentFixture<OrganizationButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrganizationButtonComponent]
    });
    fixture = TestBed.createComponent(OrganizationButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
