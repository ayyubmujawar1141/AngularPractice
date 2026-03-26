import { HttpInterceptorFn } from '@angular/common/http';

export const otpInterceptor: HttpInterceptorFn = (req, next) => {
  

  return next(req);
};
