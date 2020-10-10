import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgxPasswordStrengthMeterModule } from 'ngx-password-strength-meter';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, NgxPasswordStrengthMeterModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
