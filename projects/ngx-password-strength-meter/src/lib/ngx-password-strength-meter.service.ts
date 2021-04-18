import { StrengthResult } from './model/strength-result';
import { Inject, Injectable, Optional } from '@angular/core';
import {
  NGX_PASSWORD_STRENGTH_METER_CONFIG,
  NgxPasswordStrengthMeterConfig,
} from './ngx-password-strength-meter.model';

import { zxcvbn, ZxcvbnOptions } from '@zxcvbn-ts/core';

@Injectable({
  providedIn: 'root',
})
export class NgxPasswordStrengthMeterService {
  constructor(
    @Optional()
    @Inject(NGX_PASSWORD_STRENGTH_METER_CONFIG)
    config: NgxPasswordStrengthMeterConfig
  ) {
    if (config) {
      ZxcvbnOptions.setOptions(config.zxcvbnOptions);
    }
  }

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
