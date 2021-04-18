import { InjectionToken } from '@angular/core';
import { OptionsType } from '@zxcvbn-ts/core/dist/types';

export interface NgxPasswordStrengthMeterConfig {
  zxcvbnOptions: OptionsType;
}

export const NGX_PASSWORD_STRENGTH_METER_CONFIG = new InjectionToken(
  'NGX_PASSWORD_STRENGTH_METER_CONFIG'
);
