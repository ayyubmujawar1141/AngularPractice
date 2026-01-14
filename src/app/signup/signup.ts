import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../services/auth';
@Component({
  selector: 'app-signup',
  imports: [],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  signupData = {
    name: '',
    email: '',
    password: ''
  };

  constructor(
    private authService:Auth,
    private router:Router
  ){}

  signup(){
    this.authService.signup(this.signupData).subscribe({
      next: ()=>{
        alert('Signup successful! Please login.');
        this.router.navigate(['/login']);
      },
      error: ()=>{
        alert('Signup failed. Please try again.');
      }
    });
  }
}
