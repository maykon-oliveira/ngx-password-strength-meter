import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxPasswordStrengthMeterComponent } from '../../../ngx-password-strength-meter/src/lib/ngx-password-strength-meter.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [FormsModule, NgxPasswordStrengthMeterComponent],
})
export class AppComponent {
  public title = 'ngx-password-strength-meter-showcase';
  password = '';
}
