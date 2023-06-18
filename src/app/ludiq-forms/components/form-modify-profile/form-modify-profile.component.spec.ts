// Import necessary modules from Angular's testing library
import { ComponentFixture, TestBed } from '@angular/core/testing';

// Import the component to be tested
import { FormModifyProfileComponent } from './form-modify-profile.component';

/**
 * Start the test suite for FormModifyProfileComponent
 */
describe('FormModifyProfileComponent', () => {

  // Declare variables for the component and its fixture
  let component: FormModifyProfileComponent;
  let fixture: ComponentFixture<FormModifyProfileComponent>;

  // Before each test, configure the testing module and create the component
  beforeEach(() => {

    // Set up the testing environment for the component
    TestBed.configureTestingModule({
      declarations: [FormModifyProfileComponent]
    });

    // Create the component and store its fixture for testing
    fixture = TestBed.createComponent(FormModifyProfileComponent);
    component = fixture.componentInstance;

    // Trigger change detection for the component
    fixture.detectChanges();
  });

  /**
   * Test case to check if the component is created correctly
   */
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
