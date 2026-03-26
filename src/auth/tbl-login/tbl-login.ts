import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { SharedService } from '../../services/shared-service';
import { Auth } from '../../services/auth';
import { BasicResDto } from '../../utils/interfaces/auths/basic-res-dto';
@Component({
  selector: 'app-tbl-login',
  standalone: true,
  imports: [RouterModule, RouterLink, NgIf, FormsModule, ReactiveFormsModule],
  templateUrl: './tbl-login.html',
  styleUrl: './tbl-login.css',
})
export class TblLogin {
  email!: string;
  tblForm!: FormGroup;
  
  isLoading = false;
  
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private shared: SharedService,
    private router: Router,
    private authService:Auth
  ) {
    this.tblForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
  @ViewChild('emailInput') emailInput!: ElementRef<HTMLInputElement>;
  get f() {
    return this.tblForm.controls;
  }
  private apiUrl = environment.apiUrl;
  errorMessage = '';

  coolDownSeconds = 0;
  private intervalId: any = null;


  SendOtp() {
    this.tblForm.markAllAsTouched();

    if (this.tblForm.invalid) {
      return;
    }

    this.isLoading = true;

    this.email = this.tblForm.value.email;

    this.shared.setEmail(this.email);

    this.authService.sendOtp(this.email).subscribe({
      next:(res) => {
        
        this.router.navigate(['/otp-service'], { queryParams: { email: this.email } });
        
      },

      error:(err) => {
        if (!err.success) {
          alert('Email never exist');
          this.focusEmail();
          return;
        }
      }
    });
  }
  private focusEmail(): void {
    setTimeout(() => {
      this.emailInput?.nativeElement?.focus();
    }, 0);
  }

startCooldown(seconds: number = 120) {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.coolDownSeconds = seconds;
    this.intervalId.setInterval(() => {
      this.coolDownSeconds--;

      if (this.coolDownSeconds <= 0) {
        this.coolDownSeconds = 0;
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
    }, 1000);
  }

  sendOtpAgain() {
    this.authService.sendOtp(this.email).subscribe({
      
      next: (res) => {
        if (res.success) {
          this.startCooldown(120);
        }
      },
    });
  }
}