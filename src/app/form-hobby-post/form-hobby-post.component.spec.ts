import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormHobbyPostComponent } from './form-hobby-post.component';

describe('FormHobbyPostComponent', () => {
  let component: FormHobbyPostComponent;
  let fixture: ComponentFixture<FormHobbyPostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormHobbyPostComponent]
    });
    fixture = TestBed.createComponent(FormHobbyPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
