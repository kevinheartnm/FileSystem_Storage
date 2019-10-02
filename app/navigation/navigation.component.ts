import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  slider:boolean;
  constructor() {
    this.slider=false;
  }

  ngOnInit() {
  }
  onNavigationClick():void{
    // return an object for changing the nav__side-bar
    // setTimeout(()=>{
        this.slider = !this.slider;
        // console.log("you click navigation button");
    // },50);

  }

  showSlide():any{

    return {
      "nav__side-bar-show":this.slider
    }
  }

}
