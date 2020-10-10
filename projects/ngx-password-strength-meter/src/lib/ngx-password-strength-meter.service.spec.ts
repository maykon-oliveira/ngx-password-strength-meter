import { TestBed } from '@angular/core/testing';

import { NgxPasswordStrengthMeterService } from './ngx-password-strength-meter.service';

describe('NgxPasswordStrengthMeterService', () => {
  let service: NgxPasswordStrengthMeterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxPasswordStrengthMeterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('given a empty password should returns score 0', () => {
    const { score, feedback } = service.calculate('');
    expect(score).toEqual(0);
  });

  it('given a null, undefined password should returns throw a error', () => {
    expect(() => service.calculate(null)).toThrowError('Password should be a valid string');
  });
});
