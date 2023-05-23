import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNewPostComponent } from './form-new-post.component';

describe('FormNewPostComponent', () => {
  let component: FormNewPostComponent;
  let fixture: ComponentFixture<FormNewPostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormNewPostComponent]
    });
    fixture = TestBed.createComponent(FormNewPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
