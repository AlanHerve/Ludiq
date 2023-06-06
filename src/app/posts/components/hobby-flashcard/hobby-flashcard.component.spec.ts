import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HobbyFlashcardComponent } from './hobby-flashcard.component';

describe('HobbyFlashcardComponent', () => {
  let component: HobbyFlashcardComponent;
  let fixture: ComponentFixture<HobbyFlashcardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HobbyFlashcardComponent]
    });
    fixture = TestBed.createComponent(HobbyFlashcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
