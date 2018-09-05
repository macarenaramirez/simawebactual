import { TestBed, inject } from '@angular/core/testing';

import { InventarioInfoBackendService } from './inventario-info-backend.service';

describe('InventarioInfoBackendService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InventarioInfoBackendService]
    });
  });

  it('should be created', inject([InventarioInfoBackendService], (service: InventarioInfoBackendService) => {
    expect(service).toBeTruthy();
  }));
});
