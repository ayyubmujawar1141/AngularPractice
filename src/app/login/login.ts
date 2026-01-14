import { Component } from '@angular/core';
import { Auth } from '../services/auth';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginData = {
    email: '',
    password: ''
  };
  constructor(
    private authService:Auth,
    private router:Router
  ){}

  login(){
    this.authService.login(this.loginData).subscribe({
      next: (res) => {
        this.authService.saveToken(res.token);
        this.router.navigate(['/dashboard']);
      },
      error: ()=>{
        alert('Invalid credentials'); 
      }
    });
  }

}
