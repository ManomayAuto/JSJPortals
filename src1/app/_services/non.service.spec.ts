import { TestBed } from '@angular/core/testing';

import { NonService } from './non.service';

describe('NonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NonService = TestBed.get(NonService);
    expect(service).toBeTruthy();
  });
});
