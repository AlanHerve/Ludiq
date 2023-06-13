import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HobbyCountButtonComponent } from './hobby-count-button.component';

describe('HobbyCountButtonComponent', () => {
  let component: HobbyCountButtonComponent;
  let fixture: ComponentFixture<HobbyCountButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HobbyCountButtonComponent]
    });
    fixture = TestBed.createComponent(HobbyCountButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
