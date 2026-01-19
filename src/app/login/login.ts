import { Component } from '@angular/core';
import { Auth } from '../services/auth';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Signup } from '../signup/signup';
import { LoginResDto } from '../utils/interfaces/auths/login-res-dto';
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
      email:['',[Validators.required, Validators.email]],
      password:['',[Validators.required, Validators.minLength(8)]]
    })
  }
  showPassword:boolean = false;
  togglePassword(){
    this.showPassword = !this.showPassword;
  }

  onLogin(){
    console.log(this.loginData);
    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
      return;
    }

    this.authService.login(this.loginData).subscribe({
      next: (res:LoginResDto) => {
        this.authService.setUser(res.user);
        this.authService.saveToken(res.token);
        alert(`${res.user.name}, welcome back!`);
        this.router.navigate(['/dashboard']);
      },
      error: (err)=>{
        console.log(err.error);
        alert('Invalid credentials'); 
      }
    });
  }
  get f(){
    return this.loginForm.controls;
  }

}
