import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostListComponent } from './post-list.component';

// Unit tests for PostListComponent
describe('PostListComponent', () => {
  let component: PostListComponent;
  let fixture: ComponentFixture<PostListComponent>;

  // Setup for each test
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostListComponent]
    });
    fixture = TestBed.createComponent(PostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Test to verify the component is created
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
