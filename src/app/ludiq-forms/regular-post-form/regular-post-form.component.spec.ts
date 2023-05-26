import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegularPostFormComponent } from './regular-post-form.component';

describe('RegularPostFormComponent', () => {
  let component: RegularPostFormComponent;
  let fixture: ComponentFixture<RegularPostFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegularPostFormComponent]
    });
    fixture = TestBed.createComponent(RegularPostFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
