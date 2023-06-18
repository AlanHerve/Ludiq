import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from "@angular/platform-browser";
import { of } from "rxjs";

import { FormFavoriteHobbyComponent } from './form-favorite-hobby.component';
import { HobbyService } from "../../../services/hobby.service";

describe('FormFavoriteHobbyComponent', () => {
  let component: FormFavoriteHobbyComponent;
  let fixture: ComponentFixture<FormFavoriteHobbyComponent>;
  let mockHobbyService: { updateFavoriteHobby: jasmine.Spy };

  beforeEach(() => {
    mockHobbyService = jasmine.createSpyObj('HobbyService', ['updateFavoriteHobby']);


    TestBed.configureTestingModule({
      declarations: [ FormFavoriteHobbyComponent ],
      providers: [
        { provide: HobbyService, useValue: mockHobbyService }
      ]
    });

    fixture = TestBed.createComponent(FormFavoriteHobbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call selectFavoriteHobby when submit button is clicked', () => {
    spyOn(component, 'selectFavoriteHobby');
    let button = fixture.debugElement.query(By.css('.submit-button'));

    button.triggerEventHandler('click', null);

    fixture.detectChanges();

    expect(component.selectFavoriteHobby).toHaveBeenCalled();
  });

  it('should call updateFavoriteHobby in selectFavoriteHobby', () => {
    const response = { status: 200 };
    mockHobbyService.updateFavoriteHobby.and.returnValue(of(response));
    component.selectFavoriteHobby();

    expect(mockHobbyService.updateFavoriteHobby).toHaveBeenCalledWith(component.postDTO.userDTO.id, component.postDTO.hobbyDTO.id);
  });
});
