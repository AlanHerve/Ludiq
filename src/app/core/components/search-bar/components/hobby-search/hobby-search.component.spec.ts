import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HobbySearchComponent } from './hobby-search.component';

describe('HobbySearchComponent', () => {
  let component: HobbySearchComponent;
  let fixture: ComponentFixture<HobbySearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HobbySearchComponent]
    });
    fixture = TestBed.createComponent(HobbySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
