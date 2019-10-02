import { Component, OnInit, Input} from '@angular/core';
import {Router} from '@angular/router';
import { UserService } from '../../service/user/user.service'
// import { HandlerService } from '../../service/handler/handler.service';
// import { Subscription } from 'rxjs';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  // get name and date from the parent
   // subscription: Subscription;
   @Input() name:string;
   @Input() userDate:Date;
   showTool: boolean;


  constructor(
    private router: Router,
    private userService :UserService

  ) {}
    // info.getHeaderUpdate().subscribe(header=> console.log(header));

  ngOnInit() {}

  showToolTip(){
    setTimeout(()=>{
      this.showTool = !this.showTool;
    }, 50);

  }
  displayToolTip(){
    return {"tooltip__show": this.showTool};
  }


  logoutUser(){
    // remove projectWithCheckBox
    this.userService.logout();
    //log user out
    this.router.navigate(["/login"]);
  }

  goToProfilePage(){
    this.router.navigate(["/login"]);
  }


  // ngOnDestroy() {
  //   // unsubscribe to ensure no memory leaks
  //     this.subscription.unsubscribe();
  // }

}
