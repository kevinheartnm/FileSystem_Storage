import { Component, OnInit } from '@angular/core';
import { User } from '../../../../models/user';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../service/user/user.service'
import {HttpHeaders} from '@angular/common/http';
import { HandlerService } from '../../../service/handler/handler.service';
import {Router} from '@angular/router';

/**
Getting the user information for
 one time so that we can directly affect
 the header part of or application

*/

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  NAME:string = "name";
  MEMBER_DATE:string = "memberDate";
  user: User;
  constructor(
  private userService :UserService,
  private handler :HandlerService,
  private router: Router
  ) {
}
// in html we bind the queryParams objec to the anker __triangle
// <a [routerLink]="['/employees']" [queryParams]="{'searchTerm: 'nick'}">
// queryParamsHandling:'preserve'

  ngOnInit() {}

//Login User
  onSubmit(userForm ){
    const {username , password} = userForm.value;
    this.user = new User(username, password, "", new Date());
    this.userService.loginUser(this.user)
    .subscribe( response =>{
    //STORE USER INFORMATION
      // console.log(response ===);
      if(response){
        this.handler.storeToken(response.token);
        this.handler.getHeaderInfo(response.name,response.memberDate);
        this.router.navigate(["/profile/project"]);
      }else{
        console.log("Your user name and/or password are wrong");
      }
    }
  );
  }

}

/*
this.router.navigate(["/profile/project"],{
  queryParams:{
    name:response.name,
    memberDate:response.memberDate
  }
});
*/
