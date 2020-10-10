import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { StrengthFeedback } from './model/strength-feedback';
import { Score } from './model/strength-result';
import { NgxPasswordStrengthMeterService } from './ngx-password-strength-meter.service';

const getLengthRuleErrorMessage = {
  min: (v) => ({
    suggestions: [],
    warning: `Password should me greater than ${v}`,
  }),
  max: (v) => ({
    suggestions: [],
    warning: `Password should me less than ${v}`,
  }),
};

@Component({
  selector: 'ngx-password-strength-meter',
  templateUrl: './ngx-password-strength-meter.component.html',
  styleUrls: ['./ngx-password-strength-meter.component.scss'],
  styles: [],
})
export class NgxPasswordStrengthMeterComponent implements OnInit, OnChanges {
  @Input() password: string;
  @Input() min = 8;
  @Input() max = 30;
  @Input() enableLengthRule = true;
  @Input() enableFeedback = false;
  @Input() colors: string[] = [];
  @Output() strengthChange = new EventEmitter<number>();
  strength: Score = null;
  feedback: StrengthFeedback = null;
  private previousStrength = null;

  constructor(private service: NgxPasswordStrengthMeterService) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    const { password } = changes;
    if (!password || password.previousValue === password.currentValue) return;
    this.calculateStrength();
  }

  private calculateStrength() {
    if (!this.password) {
      this.strength = null;
      this.feedback = null;
      return;
    }

    if (
      this.enableLengthRule &&
      (this.password.length < this.min || this.password.length > this.max)
    ) {
      this.strength = 0;
      if (this.password.length < this.min) {
        this.feedback = getLengthRuleErrorMessage['min'](this.min);
      } else {
        this.feedback = getLengthRuleErrorMessage['max'](this.max);
      }
    } else {
      const { score, feedback } = this.service.calculate(this.password);
      this.strength = score;
      this.feedback = this.enableFeedback ? feedback : null;
    }

    if (this.previousStrength !== this.strength) {
      this.strengthChange.emit(this.strength);
      this.previousStrength = this.strength;
    }
  }
}
