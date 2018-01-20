import { TestBed, inject } from '@angular/core/testing';

import { UsercartService } from './usercart.service';

describe('UsercartService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsercartService]
    });
  });

  it('should be created', inject([UsercartService], (service: UsercartService) => {
    expect(service).toBeTruthy();
  }));
});
