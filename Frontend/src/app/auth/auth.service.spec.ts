import { TestBed } from '@angular/core/testing';

import { UserManagementService } from './auth.service';

describe('UserManagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserManagementService = TestBed.get(UserManagementService);
    expect(service).toBeTruthy();
  });
});
