import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormRegularPostComponent } from './form-regular-post.component';

// Unit tests for FormRegularPostComponent
describe('RegularPostFormComponent', () => {
  let component: FormRegularPostComponent;
  let fixture: ComponentFixture<FormRegularPostComponent>;

  // Setup for each test
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormRegularPostComponent]
    });
    fixture = TestBed.createComponent(FormRegularPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Test to verify the component is created
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
