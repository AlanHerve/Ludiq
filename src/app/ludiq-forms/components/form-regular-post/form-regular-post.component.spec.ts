import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRegularPostComponent } from './form-regular-post.component';

describe('RegularPostFormComponent', () => {
  let component: FormRegularPostComponent;
  let fixture: ComponentFixture<FormRegularPostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormRegularPostComponent]
    });
    fixture = TestBed.createComponent(FormRegularPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
