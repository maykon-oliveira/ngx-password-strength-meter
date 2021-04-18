import { NgxPasswordStrengthMeterService } from './ngx-password-strength-meter.service';
import { SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NgxPasswordStrengthMeterComponent } from './ngx-password-strength-meter.component';

describe('NgxPasswordStrengthMeterComponent', () => {
  let component: NgxPasswordStrengthMeterComponent;
  let fixture: ComponentFixture<NgxPasswordStrengthMeterComponent>;
  let ngxPasswordStrengthMeterServiceSpy;

  beforeEach(
    waitForAsync(() => {
      ngxPasswordStrengthMeterServiceSpy = jasmine.createSpyObj('NgxPasswordStrengthMeterService', [
        'calculate',
      ]);

      TestBed.configureTestingModule({
        declarations: [NgxPasswordStrengthMeterComponent],
        providers: [
          {
            provide: NgxPasswordStrengthMeterService,
            useValue: ngxPasswordStrengthMeterServiceSpy,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxPasswordStrengthMeterComponent);
    component = fixture.componentInstance;
    ngxPasswordStrengthMeterServiceSpy = fixture.debugElement.injector.get(
      NgxPasswordStrengthMeterService
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not call calculateStrength if password not change', () => {
    spyOn<any>(component, 'calculateStrength');
    component.min = 8;
    component.ngOnChanges({
      minLength: new SimpleChange(null, component.min, true),
    });
    fixture.detectChanges();
    expect(component['calculateStrength']).not.toHaveBeenCalled();
  });

  it('should call calculateStrength on password change', () => {
    spyOn<any>(component, 'calculateStrength');
    component.password = '123456';
    component.ngOnChanges({
      password: new SimpleChange(null, component.password, true),
    });
    fixture.detectChanges();
    expect(component['calculateStrength']).toHaveBeenCalled();
  });

  it('should not call calculateStrength on password change and previous value is equals current', () => {
    spyOn<any>(component, 'calculateStrength');
    component.password = '123456';
    component.ngOnChanges({
      password: new SimpleChange(component.password, component.password, false),
    });
    fixture.detectChanges();
    expect(component['calculateStrength']).not.toHaveBeenCalled();
  });

  it('should change the password strength as null on empty, null or undefined password', () => {
    component.password = '';
    component['calculateStrength']();
    fixture.detectChanges();
    expect(component.strength).toBeNull();
    component.password = null;
    fixture.detectChanges();
    expect(component.strength).toBeNull();
    component.password = undefined;
    fixture.detectChanges();
    expect(component.strength).toBeNull();
  });

  it('should change the password strength as 0 on fail to meet the min password length', () => {
    component.password = '123';
    component['calculateStrength']();
    fixture.detectChanges();
    expect(component.strength).toBe(0);
  });

  it('should not change the password strength as 0 if enableLengthRule is false and password length is less than min', () => {
    ngxPasswordStrengthMeterServiceSpy.calculate.and.returnValue({ score: 2 });
    component.password = '123';
    component.enableLengthRule = false;
    component['calculateStrength']();
    fixture.detectChanges();
    expect(component.strength).toBe(2);
  });

  it('should change the password strength as 0 on fail to meet the max password length', () => {
    component.password = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
    component['calculateStrength']();
    fixture.detectChanges();
    expect(component.strength).toBe(0);
  });

  it('should not change the password strength as 0 if enableLengthRule is false and password length is greather than max', () => {
    ngxPasswordStrengthMeterServiceSpy.calculate.and.returnValue({ score: 2 });
    component.password = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
    component.enableLengthRule = false;
    component['calculateStrength']();
    fixture.detectChanges();
    expect(component.strength).toBe(2);
  });

  it('should update the password strength meter', () => {
    ngxPasswordStrengthMeterServiceSpy.calculate.and.returnValue({ score: 2 });
    spyOn(component.strengthChange, 'emit');

    component.password = '123asd123';
    component['calculateStrength']();
    fixture.detectChanges();
    const passwordMeter = fixture.debugElement.query(By.css('.strength-meter-fill'));

    expect(passwordMeter.attributes['data-strength']).toBe('2');
    expect(component.strength).toBe(2);
    expect(component.strengthChange.emit).toHaveBeenCalledWith(2);
  });

  it('should not emit password strength on no strength change', () => {
    ngxPasswordStrengthMeterServiceSpy.calculate.and.returnValue({ score: 2 });
    spyOn(component.strengthChange, 'emit');

    component.password = '123asd123';
    component['calculateStrength']();

    expect(component.strength).toBe(2);

    component.password = '123asd12';
    component['calculateStrength']();
    expect(component.strength).toBe(2);

    expect(component.strengthChange.emit).toHaveBeenCalledTimes(1);
  });

  it('should display feedback on enableFeedback', () => {
    ngxPasswordStrengthMeterServiceSpy.calculate.and.returnValue({
      score: 2,
      feedback: {
        suggestions: ['Add another word or two', 'Uncommon words are better.'],
        warning: 'This is a very common password',
      },
    });

    component.password = '123asd123';
    component.enableFeedback = false;
    component['calculateStrength']();
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.password-feedback'))).toBeNull();
    expect(fixture.debugElement.query(By.css('.password-suggetion'))).toBeNull();

    component.enableFeedback = true;
    component['calculateStrength']();
    fixture.detectChanges();

    expect(ngxPasswordStrengthMeterServiceSpy.calculate).toHaveBeenCalledTimes(2);
    expect(fixture.debugElement.query(By.css('.password-feedback'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('.password-suggetion'))).toBeTruthy();
  });
});
