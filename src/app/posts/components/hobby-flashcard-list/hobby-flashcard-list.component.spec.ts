import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HobbyFlashcardListComponent } from './hobby-flashcard-list.component';

describe('HobbyFlashcardListComponent', () => {
  let component: HobbyFlashcardListComponent;
  let fixture: ComponentFixture<HobbyFlashcardListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HobbyFlashcardListComponent]
    });
    fixture = TestBed.createComponent(HobbyFlashcardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
