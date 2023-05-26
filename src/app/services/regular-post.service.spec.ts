import { TestBed } from '@angular/core/testing';

import { RegularPostService } from './regular-post.service';

describe('RegularPostService', () => {
  let service: RegularPostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegularPostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
