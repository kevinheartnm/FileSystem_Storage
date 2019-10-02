import { Component, OnInit, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-table-head',
  templateUrl: './table-head.component.html',
  styleUrls: ['./table-head.component.scss']
})
export class TableHeadComponent implements OnInit {
  showMenu: boolean;
  @Output() addOneRow: EventEmitter<any> = new EventEmitter;
  @Output() addOneColumn: EventEmitter<any> = new EventEmitter;

  constructor(){ this.showMenu = false;}

  ngOnInit() {}

  showMenuAdd(showMenu:boolean){
    this.showMenu = showMenu;
    // console.log("parent component : " + showMenu);
  }

      // console.log("add rows second emit");
  addOneRowFromAddMenu(){
    this.addOneRow.emit();
  }
      // console.log("second call column");
  addOneColumnFromAddMenu(){
    this.addOneColumn.emit();
  }
}
