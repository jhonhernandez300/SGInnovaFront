import { TestBed } from '@angular/core/testing';

import { ProyectoTransferService } from './proyecto-transfer.service';

describe('ProyectoTransferService', () => {
  let service: ProyectoTransferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProyectoTransferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
