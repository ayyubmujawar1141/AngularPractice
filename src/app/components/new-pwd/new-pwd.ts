import { NgIf } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { Auth } from '../../services/auth';
import { SharedService } from '../../services/shared-service';

@Component({
  selector: 'app-new-pwd',
  imports: [FormsModule, NgIf, ReactiveFormsModule],
  templateUrl: './new-pwd.html',
  styleUrl: './new-pwd.css',
})
export class NewPwd {

  @ViewChild('container') container!: ElementRef;

  ngAfterViewInit() {
    const height = this.container.nativeElement.offsetHeight;
    console.log(height);
  }

  newPwdForm !: FormGroup;


  constructor(private fb:FormBuilder,private authService:Auth,private shared:SharedService){
    this.newPwdForm = this.fb.group({
      password:['',[Validators.required,Validators.minLength(8)]],
      confirmPassword:['',Validators.required]
    }, {Validators:this.passwordMatchValidator}
  );
  }
  passwordMatchValidator(control:AbstractControl){
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    if(!password || !confirmPassword) return null;
    return password === confirmPassword ? null : {passwordMismatch:true};
  }
  
  

  onSubmit(){
    if(this.newPwdForm.invalid){
      this.newPwdForm.markAllAsTouched;
      return;
    }

    const newPassword = this.newPwdForm.value.newPassword();
    const confirmPassword = this.newPwdForm.value.confirmPassword();

    console.log('newPassword:', newPassword);
  console.log('confirmPassword:', confirmPassword);
    const payload = {
        newPassword:newPassword,
        confirmPassword:confirmPassword
    }
    console.log("button clicked",payload)
    //we have to pass new password to backend from here, backend endpoint isn't ready yet;
    this.authService.sendNewPassword(payload).subscribe({
      next:(res)=>{
        alert("password changed successfully");
      },
      error:(err)=>{
        alert("Password changed failed");
        console.error(err);
        
      }
    })
  }

  get f (){
    return this.newPwdForm.controls;
  }

  showPassword = false;
  showConfirmPassword = false;
  togglePassword(){
    this.showPassword = !this.showPassword;
  }
  toggleConfirmPassword(){
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}
