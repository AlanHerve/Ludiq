// Importing necessary modules from Angular and the component itself
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { PostComponent } from './post.component';

// Starting the testsuite
describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;

  // Setting up the testing environment before each test
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Declaring the component to be tested
      declarations: [PostComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    // Creating a fixture for the component
    fixture = TestBed.createComponent(PostComponent);
    // Instantiating the component
    component = fixture.componentInstance;
    // Triggering change detection
    fixture.detectChanges();
  });

  // Test to verify the component gets created
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // Test to verify the post's title is being displayed
  it('should display the posts title', () => {
    // Triggering change detection
    fixture.detectChanges();
    // Selecting the title element from the DOM
    const titleElement = fixture.nativeElement.querySelector('.posts-title');
    // Expecting the title element to contain 'Example Title'
    expect(titleElement.textContent).toContain('Example Title');
  });

  // Test to verify an event is emitted when a post is liked
  it('should emit an event when the posts is liked', () => {
    // Spying on the postLiked event emitter
    spyOn(component.postLiked, 'emit');
    // Selecting the like button from the DOM
    const likeButton = fixture.nativeElement.querySelector('.like-button');
    // Simulating a click event on the like button
    likeButton.click();
  });
});
