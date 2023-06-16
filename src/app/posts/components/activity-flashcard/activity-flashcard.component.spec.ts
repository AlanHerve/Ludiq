import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityFlashcardComponent } from './activity-flashcard.component';

describe('ActivityComponent', () => {
  let component: ActivityFlashcardComponent;
  let fixture: ComponentFixture<ActivityFlashcardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivityFlashcardComponent]
    });
    fixture = TestBed.createComponent(ActivityFlashcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
