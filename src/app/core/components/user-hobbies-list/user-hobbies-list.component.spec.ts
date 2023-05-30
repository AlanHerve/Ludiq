import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserHobbiesListComponent } from './user-hobbies-list.component';

describe('UserHobbiesListComponent', () => {
  let component: UserHobbiesListComponent;
  let fixture: ComponentFixture<UserHobbiesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserHobbiesListComponent]
    });
    fixture = TestBed.createComponent(UserHobbiesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
