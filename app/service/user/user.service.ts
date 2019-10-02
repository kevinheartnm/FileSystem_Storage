import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from  '../../../models/user';
import { Register } from  '../../../models/register';
import { HandlerService } from  '../handler/handler.service';
@Injectable({
  providedIn: 'root'
})


export class UserService {
  url: string = "http://localhost:8080/project1-server/auth";

  loginPath: string = "/login";
  signupPath: string = "/signup";
  logoutPath: string = "/logout";


  constructor(
    private http: HttpClient,
    private handler: HandlerService
  ) { }
    // login user
    loginUser(user: User):Observable<any>{
      // console.log(user);
      return this.http.post(`${this.url}${this.loginPath}`, user);
    }


    // register a user
    registerUser(register: Register):Observable<any>{
      let user: User = this.handler.createUser(register);
      return this.http.post(`${this.url}${this.signupPath}`,  user,{observe: 'response'});
    }
    logout(){
      this.handler.removeTokenFromLocalStorage();
    }
    // check if the user is log in or not
    loggedIn(){
      return !!localStorage.getItem('token');
    }
    getToken(){
      return localStorage.getItem('token');
    }
}
/*


default user to test with
{
	"username":"user12345",
	"password":"password1",
	"name":"name",
	"memberDate":"2014-01-01T23:28:56.782Z"
}
 Third argument
{ header : header ,
observe: 'response'}

*/
