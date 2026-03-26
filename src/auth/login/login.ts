import { Component } from '@angular/core';
import { Auth } from '../../services/auth';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Signup } from '../signup/signup';
import { LoginResDto } from '../../utils/interfaces/auths/login-res-dto';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-login',
  standalone:true,
  imports: [FormsModule, ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginData = {
    email: '',
    password: ''
  };
  loginForm !: FormGroup;
  constructor(
    private authService:Auth,
    private router:Router,
    private fb:FormBuilder
  ){
    this.loginForm = this.fb.group({
      email:['',[Validators.required, Validators.email, Validators.minLength(15), Validators.maxLength(50)]],
      password:['',[Validators.required, Validators.minLength(6)]]
    });
  }
  showPassword:boolean = false;
  togglePassword(){
    this.showPassword = !this.showPassword;
  }

  onLogin(){
    console.log(this.loginForm.value);
    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
      return;
    }

    this.authService.login(this.loginForm.value).subscribe({
      next: (res:LoginResDto) => {
        this.authService.setUser(res.user);
        this.authService.saveToken(res.token);
        alert(`${res.user.name}, welcome back!`);
        this.router.navigate(['/dashboard']);
      },
      error: (err)=>{
        const validationErrors = err.error?.errors;
  console.log("Validation errors:", validationErrors);
        alert('Invalid credentials'); 
      }
    });
  }
  get f(){
    return this.loginForm.controls;
  }

}
