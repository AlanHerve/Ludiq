import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityFlashcardListComponent } from './activity-flashcard-list.component';

describe('ActivityListComponent', () => {
  let component: ActivityFlashcardListComponent;
  let fixture: ComponentFixture<ActivityFlashcardListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivityFlashcardListComponent]
    });
    fixture = TestBed.createComponent(ActivityFlashcardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
