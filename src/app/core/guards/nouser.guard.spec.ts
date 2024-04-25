import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { nouserGuard } from './nouser.guard';

describe('nouserGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => nouserGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
