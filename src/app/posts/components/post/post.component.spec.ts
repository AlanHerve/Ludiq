import { TestBed, ComponentFixture } from '@angular/core/testing';
import { PostComponent } from './post.component';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the posts title', () => {
    fixture.detectChanges();
    const titleElement = fixture.nativeElement.querySelector('.posts-title');
    expect(titleElement.textContent).toContain('Example Title');
  });

  it('should emit an event when the posts is liked', () => {
    spyOn(component.postLiked, 'emit');
    const likeButton = fixture.nativeElement.querySelector('.like-button');
    likeButton.click();
  });
});
