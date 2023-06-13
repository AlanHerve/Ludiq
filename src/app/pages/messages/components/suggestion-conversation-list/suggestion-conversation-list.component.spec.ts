import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionConversationListComponent } from './suggestion-conversation-list.component';

describe('SuggestionConversationListComponent', () => {
  let component: SuggestionConversationListComponent;
  let fixture: ComponentFixture<SuggestionConversationListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuggestionConversationListComponent]
    });
    fixture = TestBed.createComponent(SuggestionConversationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
