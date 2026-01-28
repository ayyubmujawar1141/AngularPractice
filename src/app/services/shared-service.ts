import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root',
})
export class SharedService {

  private emailSource = new BehaviorSubject<string>('');
  private otpSource = new BehaviorSubject<string>('');

  email$ = this.emailSource.asObservable();
  otp$ = this.otpSource.asObservable();

  setEmail(email: string) {
    this.emailSource.next(email);
    console.log(this.emailSource);
  }
  setOtp(otp:string){
    this.otpSource.next(otp);
  }
  getEmail(){
    return this.emailSource.value;
  }
  getOtp(){
    return this.otpSource.value;
  }
}
