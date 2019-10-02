import { Injectable } from '@angular/core';
import { User } from '../../../models/user';
import { Register } from '../../../models/register';
// import { UserService } from '../user/user.service';
import {HttpHeaders} from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
// import { HandlerService } from '../../service/handler/handler.service';
// import 'rxjs/add/observable/empty'
@Injectable({
  providedIn: 'root'
})
export class HandlerService {
  TOKEN:string = "token";
  private token: String;
  project:string;
  name:string;
  memberDate:Date;


  private userInfo = new Subject<any>();
  // @Output() getHeaderUpdate: EventEmitter<any> = new EventEmitter();
  constructor() { }



  passwordCheck(password:string,passwordCheck:string):boolean{
    if(password === passwordCheck){
      return true;
    }
    return false;
  }

  storeToken(token){
    const headers = new Headers();
    // store token in handler
    this.token = token;
    // store in local storage
    localStorage.setItem(this.TOKEN, token);
    // store token in the header
    // this.header.set(this.TOKEN, token);
    // headers.append('Content-Type','application/json');
    // headers.append(this.TOKEN,token);
  }

  createUser(register: Register):User{
    let user: User = new User(
                            register.username,
                            register.password,
                            register.name,
                            new Date()
                          );
    if(this.passwordCheck(register.password,register.passwordCheck)){
      return user;
    }
    return null;
  }
  removeTokenFromLocalStorage(){
    localStorage.removeItem(this.TOKEN);
  }

  // Get the first project displayed
  getProjectInfo( project:string):void{
    // console.log("project infromation");
    // console.log(project);
    this.project = project;
    this.userInfo.next({project:this.project,name:this.name, memberDate:this.memberDate});
  }

  // Get the information for the header tag
  getHeaderInfo( name:string, memberDate:string):void{
    this.name = name;
    this.memberDate = new Date(memberDate);
    // this.getHeaderUpdate.emit({"name":this.name,"memberDate":this.memberDate});
    this.userInfo.next({name:this.name, memberDate:this.memberDate});
  }

  getUserInfo():Observable<any>{
    return this.userInfo.asObservable();
  }
  // showMemberDate(){
  //   return this.memberDate;
  // }


}
