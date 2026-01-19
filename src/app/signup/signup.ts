import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../services/auth';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import{ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-signup',
  standalone:true,
  imports: [FormsModule, FormsModule, ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  signupData:any={};
  ngOnInit(){
    this.signupForm.valueChanges.subscribe(val => {
      this.signupData = val;
    });
  }

  signupForm !: FormGroup;
  constructor(
    private authService:Auth,
    private router:Router,
    private fb:FormBuilder
  ){
    this.signupForm = this.fb.group({
      name:['', Validators.required],
      email:['',[Validators.required, Validators.email]],
      password:['',[Validators.required, Validators.minLength(8)]],
      confirmPassword:['', Validators.required]
    }
    ,{validator: this.passwordMatchValidator}
  );
  }

  passwordMatchValidator(control:AbstractControl){
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    if(!password || !confirmPassword) return null;
    return password === confirmPassword ? null : {passwordMismatch:true};
  }

  get f(){
    return this.signupForm.controls;
  }
  onSubmit(){
    console.log("this.signupData");
    if(this.signupForm.invalid){
      this.signupForm.markAllAsTouched();
      return;
    }
    console.log(this.signupData);
    this.authService.signup(this.signupData).subscribe({
      next: ()=>{
        alert('Signup successful! Please login.');
        this.router.navigate(['/login']);
      },
      error: (err)=>{
        console.log(err.error);
        console.log("Validation errors:",err.error.errors);
        alert('Signup failed. Please try again.');
      }
    });
  }

  showPassword = false;
  showConfirmPassword = false;
  togglePassword(){
    this.showPassword = !this.showPassword;
  }
  toggleConfirmPassword(){
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}
