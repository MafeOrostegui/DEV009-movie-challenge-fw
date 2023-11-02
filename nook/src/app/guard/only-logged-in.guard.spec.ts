import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { onlyLoggedInGuardGuard } from './only-logged-in.guard';

describe('onlyLoggedInGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => onlyLoggedInGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
