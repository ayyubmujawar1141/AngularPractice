import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResDto } from '../utils/interfaces/auths/login-res-dto';
import { UserResDto } from '../utils/interfaces/users/user-res-dto';
import { environment} from '../../environments/environment';
import { BasicResDto } from '../utils/interfaces/auths/basic-res-dto';
@Injectable({
  providedIn: 'root',
})

export class Auth {
   private apiUrl = environment.apiUrl;//backend API URL
   constructor(private http: HttpClient){}

   //login 
  login(data:any):Observable<any>{
    return this.http.post(`${this.apiUrl}/auth/login`,data);
  }
  //signup
  signup(data:any):Observable<any>{
    return this.http.post(`${this.apiUrl}/auth/signup`,data);
  }
  //Save token
  saveToken(token:string){
    localStorage.setItem('token',token);
  }
  //Get token
  getToken(){
    return localStorage.getItem('token');
  }
  //Get User
  getUser(){

    return localStorage.getItem('user');
  }

  //Set User
  setUser(user:UserResDto){
    return localStorage.setItem('user',JSON.stringify(user));
  }
  //logout
  logout(){
    localStorage.removeItem('token');
  }
  //Check login status
  isLoggedIn():boolean{
    return !!this.getToken();
  }
  //verify otp
  verifyOTP(otp:string, email:string):Observable<any>{
    console.log(email,otp);
    return this.http.post(`${this.apiUrl}/auth/verify`,{email,otp});
  }
  //Sending email for requesting an OTP
  sendOtp(email:string){
    return this.http.post<BasicResDto>(`${this.apiUrl}/auth/send`,{email},{withCredentials:true});
  }
  //reseting and sending new password
  
  sendNewPassword(payload:{
      newPassword:string,
      confirmPassword:string    
  }){
    return this.http.post(`${this.apiUrl}/auth/reset-password`,payload,{withCredentials:true});
  }

}
