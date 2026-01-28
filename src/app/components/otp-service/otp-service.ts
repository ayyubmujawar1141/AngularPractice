import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';
import { SharedService } from '../../services/shared-service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-otp-service',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './otp-service.html',
  styleUrl: './otp-service.css',
})
export class OtpService implements OnInit {
  otpForm!: FormGroup;

  otpInvalid = false;

  email = '';

  public getEmail: any = '';
  constructor(
    private fb: FormBuilder,
    private authService: Auth,
    private router: Router,
    private shared: SharedService,
    private route: ActivatedRoute,
  ) {
    this.otpForm = this.fb.group({
      otp: this.fb.group({
        d1: ['', [Validators.required]],
        d2: ['', [Validators.required]],
        d3: ['', [Validators.required]],
        d4: ['', [Validators.required]],
        d5: ['', [Validators.required]],
        d6: ['', [Validators.required]],
      }),
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.email = params['email'] || '';
    });
  }
  getOtpValue(): string {
    const otpValues = Object.values(this.otpForm.get('otp')?.value || {});
    return otpValues.join('');
  }

  verifyOtp() {
    const otp = this.getOtpValue();
    if (otp.length !== 6) {
      this.otpInvalid = true;
      return;
    }
    this.otpInvalid = false;

    const email = this.shared.getEmail();
    this.authService.verifyOTP(otp, email).subscribe({
      next: () => {
        alert('Verified successfully!');
        this.router.navigate(['/new-pwd']);
      },
      error: () => {
        alert('Verification failed');
        this.router.navigate(['/tbl-login']);
      },
    });
  }

  moveNext(event: any, index: number) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9]/g, ''); //only numbers

    if (input.value && index < 6) {
      const nextInput = input.parentElement?.querySelectorAll('input')[index] as HTMLInputElement;
      nextInput?.focus();
    }
  }

  handleBack(event: KeyboardEvent, index: number) {
    const input = event.target as HTMLInputElement;

    if (event.key === 'Backspace' && !input.value && index > 1) {
      const prevInput = input.parentElement?.querySelectorAll('input')[
        index - 2
      ] as HTMLInputElement;
      prevInput?.focus();
    }
  }
  
}
