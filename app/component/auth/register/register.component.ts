import { Component, OnInit } from '@angular/core';
import { Register } from '../../../../models/register';
import { UserService } from '../../../service/user/user.service'
import {Router} from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  message:string="";
  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {}
  onSubmit(registerForm: any){
    let extra:any;
    this.userService
    .registerUser(registerForm.value)
    .subscribe(res=>{console.log(res);
      extra = {"message":res.message};
    }
    ,err=>{ console.log(err);
      extra = {"message":"Someone already has that user name"};
    }
  );
  // this.router.navigateByUrl('/login', extra);
       this.router.navigateByUrl('/login');
  }

}
