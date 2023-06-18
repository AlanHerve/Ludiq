// Import necessary modules
import { ComponentFixture, TestBed } from '@angular/core/testing';

// Import the CommentListComponent to test
import { CommentListComponent } from './comment-list.component';

// Define a test suite for the CommentListComponent
describe('CommentListComponent', () => {
  // Define a variable to hold an instance of the CommentListComponent
  let component: CommentListComponent;
  // Define a variable to hold a fixture for the CommentListComponent
  let fixture: ComponentFixture<CommentListComponent>;

  // Before each test in the suite, configure the testing environment
  beforeEach(() => {
    // Configure a test bed
    TestBed.configureTestingModule({
      // Declare the CommentListComponent in the test bed
      declarations: [CommentListComponent]
    });
    // Create a fixture for the CommentListComponent
    fixture = TestBed.createComponent(CommentListComponent);
    // Get the instance of the CommentListComponent from the fixture
    component = fixture.componentInstance;
    // Trigger change detection for the CommentListComponent
    fixture.detectChanges();
  });

  // Define a test
  it('should create', () => {
    // Expect that the CommentListComponent was created successfully
    expect(component).toBeTruthy();
  });
});
