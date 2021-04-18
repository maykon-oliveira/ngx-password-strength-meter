import { StrengthResult } from './model/strength-result';
import { Injectable } from '@angular/core';

import { zxcvbn } from '@zxcvbn-ts/core';

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
   * @returns An instance of StrengthResult
   */
  calculate(password: string): StrengthResult {
    if (password === undefined || password === null)
      throw new Error('Password should be a valid string');

    if (!password.length) {
      return { score: 0, feedback: { suggestions: [], warning: '' } };
    }

    return zxcvbn(password);
  }
}
