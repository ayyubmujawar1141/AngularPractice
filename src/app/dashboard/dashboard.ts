import { Component } from '@angular/core';
import { Login } from '../login/login';
import { Auth } from '../services/auth';
import { UserResDto } from '../utils/interfaces/users/user-res-dto';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  constructor(private authService:Auth,private http:HttpClient){ 
    
  }
  private apiUrl = '';//backend API URL
  readonly token = localStorage.getItem('token');
 
  headers = new HttpHeaders({
    'Authorization': `Bearer ${this.token}`
  });

  getName ():string|null{
    const user : UserResDto = JSON.parse(this.authService.getUser()!) as UserResDto;
    if(user)
        return user.name;
    else return null;
  }
  
  sendRequest(){
    console.log("button is clicked");
    return this.http.get('http://localhost:5038/api/Test/profile', { headers: this.headers }).subscribe(console.log);

  }
}