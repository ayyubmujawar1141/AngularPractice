import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';
import { FormBuilder, FormGroup, FormsModule } from "@angular/forms";
@Component({
  selector: 'app-tbl-login',
  standalone: true,
  imports: [RouterModule, RouterLink, NgIf, FormsModule,ReactiveFormsModule],
  templateUrl: './tbl-login.html',
  styleUrl: './tbl-login.css',
})
export class TblLogin {
  onSendLink(){

  }
  tblForm !: FormGroup;
  constructor(private fb:FormBuilder){
    this.tblForm = this.fb.group({
  email: ['', [Validators.required, Validators.email]]
});

  }
  get f(){
    return this.tblForm.controls;
    
  }

}
