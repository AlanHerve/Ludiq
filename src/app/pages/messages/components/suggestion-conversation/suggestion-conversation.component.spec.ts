import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionConversationComponent } from './suggestion-conversation.component';

describe('SuggestionConversationComponent', () => {
  let component: SuggestionConversationComponent;
  let fixture: ComponentFixture<SuggestionConversationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuggestionConversationComponent]
    });
    fixture = TestBed.createComponent(SuggestionConversationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
