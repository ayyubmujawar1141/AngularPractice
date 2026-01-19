import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';
import { FormBuilder, FormGroup, FormsModule } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-tbl-login',
  standalone: true,
  imports: [RouterModule, RouterLink, NgIf, FormsModule,ReactiveFormsModule],
  templateUrl: './tbl-login.html',
  styleUrl: './tbl-login.css',
})
export class TblLogin {

  email!:string;
  tblForm !: FormGroup;
  constructor(private fb:FormBuilder,private http:HttpClient){
      this.tblForm = this.fb.group({
          email: ['', [Validators.required, Validators.email]]
      });
  }
  get f(){
    return this.tblForm.controls;
    
  }
  private apiUrl = environment.apiUrl;

  onSendLink(){
    if(this.tblForm.invalid){
      this.tblForm.markAllAsTouched();
      return;
    }
    const userEmail: any = this.tblForm.value.email;
    console.log(userEmail);
    return this.http.post(`${this.apiUrl}/Auth/forgot-password`,{email:userEmail}).subscribe(console.log);
  }

}
