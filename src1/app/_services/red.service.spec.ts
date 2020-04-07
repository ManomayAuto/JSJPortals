import { TestBed } from '@angular/core/testing';

import { RedService } from './red.service';

describe('RedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RedService = TestBed.get(RedService);
    expect(service).toBeTruthy();
  });
});
