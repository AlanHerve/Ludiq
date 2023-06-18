// Import necessary modules
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewCommentComponent } from './new-comment.component';

// Unit test for NewCommentComponent
describe('CommentComponent', () => {
  let component: NewCommentComponent;
  let fixture: ComponentFixture<NewCommentComponent>;

  beforeEach(() => {
    // Set up TestBed
    TestBed.configureTestingModule({
      declarations: [NewCommentComponent]
    });
    // Create a fixture for the component
    fixture = TestBed.createComponent(NewCommentComponent);
    // Get an instance of the component
    component = fixture.componentInstance;
    // Trigger change detection for the component
    fixture.detectChanges();
  });

  // A simple test to verify component creation
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
