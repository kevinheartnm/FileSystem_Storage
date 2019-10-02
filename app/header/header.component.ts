import { Component, OnInit, OnDestroy} from '@angular/core';
import { HandlerService } from '../service/handler/handler.service';
import { Subscription } from 'rxjs';
// import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  // subscription: Subscription;
  project:string="";
  name:string="";
  userDate:Date=new Date();
  subscription: Subscription;


  constructor(private info:HandlerService) {

  }

  ngOnInit() {
    // this.user = this.route.snapshot.paramMap.get("name");
    // console.log(this.name);
    this.subscription = this.info
    .getUserInfo()
    .subscribe(res =>{
      // console.log(res);
          if(res.project)
            this.project = res.project;
          if(res.name)
            this.name = res.name;
          if(res.memberDate)
            this.userDate= new Date(res.memberDate);
    });
  }
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
      this.subscription.unsubscribe();
  }

}


//   this.route.paramMap.subscribe(params => {
//   // this.animal = params.get("animal")
//    this.user = params.get("name");
//    console.log(params);
// })
