import { TestBed, inject } from '@angular/core/testing';

import { AuthenticatorUtilsService } from './authenticator-utils.service';

describe('AuthenticatorUtilsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenticatorUtilsService]
    });
  });

  it('should be created', inject([AuthenticatorUtilsService], (service: AuthenticatorUtilsService) => {
    expect(service).toBeTruthy();
  }));
});
