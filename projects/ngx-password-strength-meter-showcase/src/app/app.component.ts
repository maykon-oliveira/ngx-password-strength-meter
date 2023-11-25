import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxPasswordStrengthMeter } from '../../../ngx-password-strength-meter/src/lib/ngx-password-strength-meter.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [FormsModule, NgxPasswordStrengthMeter],
})
export class AppComponent {
  public title = 'ngx-password-strength-meter-showcase';
  password = '';
}
