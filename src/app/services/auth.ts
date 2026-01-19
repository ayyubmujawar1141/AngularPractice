import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResDto } from '../utils/interfaces/auths/login-res-dto';
import { UserResDto } from '../utils/interfaces/users/user-res-dto';
import { environment} from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})

export class Auth {
   private apiUrl = environment.apiUrl;//backend API URL
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
}
