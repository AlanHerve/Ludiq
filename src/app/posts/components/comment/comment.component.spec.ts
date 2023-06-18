// Import necessary modules
import { ComponentFixture, TestBed } from '@angular/core/testing';

// Import the CommentComponent to test
import { CommentComponent } from './comment.component';

// Define a test suite for the CommentComponent
describe('CommentComponent', () => {
  // Define a variable to hold an instance of the CommentComponent
  let component: CommentComponent;
  // Define a variable to hold a fixture for the CommentComponent
  let fixture: ComponentFixture<CommentComponent>;

  // Before each test in the suite, configure the testing environment
  beforeEach(() => {
    // Configure a test bed
    TestBed.configureTestingModule({
      // Declare the CommentComponent in the test bed
      declarations: [CommentComponent]
    });
    // Create a fixture for the CommentComponent
    fixture = TestBed.createComponent(CommentComponent);
    // Get the instance of the CommentComponent from the fixture
    component = fixture.componentInstance;
    // Trigger change detection for the CommentComponent
    fixture.detectChanges();
  });

  // Define a test
  it('should create', () => {
    // Expect that the CommentComponent was created successfully
    expect(component).toBeTruthy();
  });
});
