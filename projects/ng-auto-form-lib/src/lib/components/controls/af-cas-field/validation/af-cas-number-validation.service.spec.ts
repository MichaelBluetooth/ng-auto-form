import { TestBed, inject } from '@angular/core/testing';
import { AfCasNumberValidationService } from './af-cas-number-validation.service';

describe('CasNumberValidationService', () => {
  let casNumberValidationService: AfCasNumberValidationService;

  const knownGoodCASNumbers = [
    '50-00-0',
    '50-36-2'
  ];

  const knownBadCASNumbers = [
    '50-20-1',
    '20-222-1'
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AfCasNumberValidationService]
    });
  });

  beforeEach(inject([AfCasNumberValidationService], (service: AfCasNumberValidationService) => {
    casNumberValidationService = service;
  }));

  it('should be created', () => {
    expect(casNumberValidationService).toBeTruthy();
  });

  it('treats null as valid', () => {
    expect(casNumberValidationService.isValid(null)).toBe(true);
  });

  it('treats undefined as valid', () => {
    expect(casNumberValidationService.isValid(undefined)).toBe(true);
  });

  it('should invalidate cas numbers that do not match the pattern', () => {
    expect(casNumberValidationService.isValid('asjf3lkjfaf')).toBe(false);
  });

  for (let i = 0; i < knownBadCASNumbers.length; i++) {
    it('should invalidate cas numbers with bad digits', () => {
      expect(casNumberValidationService.isValid(knownBadCASNumbers[i])).toBe(false);
    });
  }

  for (let i = 0; i < knownGoodCASNumbers.length; i++) {
    it('should validate good cas numbers', () => {
      expect(casNumberValidationService.isValid(knownGoodCASNumbers[i])).toBe(true);
    });
  }
});
