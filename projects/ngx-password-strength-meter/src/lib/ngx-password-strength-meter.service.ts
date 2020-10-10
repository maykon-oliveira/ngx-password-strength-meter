import { StrengthResult } from './model/strength-result';
import { Injectable } from '@angular/core';

import { zxcvbn } from 'zxcvbn3';

@Injectable({
  providedIn: 'root',
})
export class NgxPasswordStrengthMeterService {
  constructor() {}

  /**
   * This will calculates the password strength
   *
   * @param password - Password
   *
   * @returns An instance of ScoreResult
   */
  calculate(password: string): StrengthResult {
    if (password === undefined || password === null)
      throw new Error('Password should be a valid string');

    const { score, feedback } = zxcvbn(password);
    return { score, feedback };
  }
}
