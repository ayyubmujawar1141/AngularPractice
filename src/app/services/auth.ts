import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
   private apiUrl = 'https://api.example.com';//backend API URL
   constructor(private http: HttpClient){}

   //login 
  login(data:any):Observable<any>{
    return this.http.post(`${this.apiUrl}/login`,data);
  }
  //signup
  signup(data:any):Observable<any>{
    return this.http.post(`${this.apiUrl}/signup`,data);
  }
  //Save token
  saveToken(token:string){
    localStorage.setItem('token',token);
  }
  //Get token
  getToken(){
    return localStorage.getItem('token');
  }
  //logout
  logout(){
    localStorage.removeItem('token');
  }
  //Check login status
  isLoggedIn():boolean{
    return !!this.getToken();
  }
}
