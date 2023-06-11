import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopActivityComponent } from './top-activity.component';

describe('TopActivityComponent', () => {
  let component: TopActivityComponent;
  let fixture: ComponentFixture<TopActivityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopActivityComponent]
    });
    fixture = TestBed.createComponent(TopActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
