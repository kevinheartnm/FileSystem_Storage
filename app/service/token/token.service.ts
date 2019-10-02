import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService implements HttpInterceptor{

  constructor(
    private injector: Injector,
    private userService: UserService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler){
    let authService = this.userService.getToken();//injector.get(UserService);
    let tokenizedReq = req.clone({
      setHeaders:{
        Authorization: `${authService}`
      }
    });
    // console.log(tokenizedReq);
    return next.handle(tokenizedReq);
  }
}
