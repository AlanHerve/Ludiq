import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MightLikeHobbiesDisplayComponent } from './might-like-hobbies-display.component';

describe('MightLikeHobbiesDisplayComponent', () => {
  let component: MightLikeHobbiesDisplayComponent;
  let fixture: ComponentFixture<MightLikeHobbiesDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MightLikeHobbiesDisplayComponent]
    });
    fixture = TestBed.createComponent(MightLikeHobbiesDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
