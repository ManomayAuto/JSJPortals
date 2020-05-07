import { TestBed } from '@angular/core/testing';

import { QtableService } from './qtable.service';

describe('QtableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QtableService = TestBed.get(QtableService);
    expect(service).toBeTruthy();
  });
});
