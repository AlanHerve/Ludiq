import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFavoriteHobbyComponent } from './form-favorite-hobby.component';

describe('FormFavoriteHobbyComponent', () => {
  let component: FormFavoriteHobbyComponent;
  let fixture: ComponentFixture<FormFavoriteHobbyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormFavoriteHobbyComponent]
    });
    fixture = TestBed.createComponent(FormFavoriteHobbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
