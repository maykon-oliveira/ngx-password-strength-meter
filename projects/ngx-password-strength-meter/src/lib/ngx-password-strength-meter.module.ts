import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { NgxPasswordStrengthMeterComponent } from './components/ngx-password-strength-meter.component';
import {
  NgxPasswordStrengthMeterConfig,
  NGX_PASSWORD_STRENGTH_METER_CONFIG,
} from './ngx-password-strength-meter.model';

@NgModule({
  imports: [CommonModule],
  declarations: [NgxPasswordStrengthMeterComponent],
  exports: [NgxPasswordStrengthMeterComponent],
})
export class NgxPasswordStrengthMeterModule {
  static forRoot(
    config?: NgxPasswordStrengthMeterConfig
  ): ModuleWithProviders<NgxPasswordStrengthMeterModule> {
    return {
      ngModule: NgxPasswordStrengthMeterModule,
      providers: [
        {
          provide: NGX_PASSWORD_STRENGTH_METER_CONFIG,
          useValue: config,
        },
      ],
    };
  }
}
