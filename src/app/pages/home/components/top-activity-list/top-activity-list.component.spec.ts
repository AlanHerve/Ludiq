import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopActivityListComponent } from './top-activity-list.component';

describe('TopActivityListComponent', () => {
  let component: TopActivityListComponent;
  let fixture: ComponentFixture<TopActivityListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopActivityListComponent]
    });
    fixture = TestBed.createComponent(TopActivityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
