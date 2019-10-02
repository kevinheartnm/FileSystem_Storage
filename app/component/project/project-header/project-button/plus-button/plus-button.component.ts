import { Component, OnInit, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-plus-button',
  templateUrl: './plus-button.component.html',
  styleUrls: ['./plus-button.component.scss']
})
//CHILD button
export class PlusButtonComponent implements OnInit {
  @Output() showMenuAdd:EventEmitter<boolean> = new EventEmitter();
  showAddMenu:boolean;
  constructor() {
    this.showAddMenu = false;
  }

  ngOnInit() {}

  showAddMenuClass(){
    setTimeout(()=>{
      this.showAddMenu = !this.showAddMenu;
      this.showMenuAdd.emit(this.showAddMenu);
        // this.countChange.emit(this.count);

    }, 50);
    // this.showAddMenu = !this.showAddMenu;
    // console.log("show menu");
  }
}
