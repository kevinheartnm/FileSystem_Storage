import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table-rows',
  templateUrl: './table-rows.component.html',
  styleUrls: ['./table-rows.component.scss']
})
export class TableRowsComponent implements OnInit {
  @Input()  row;
  @Input()  rowidx;
  @Input()  colidx;
  @Output() addChangesToTable: EventEmitter <{row:string, rowidx:number, colidx:number}> = new EventEmitter();
  focus: boolean;
  constructor() {
    // console.log(this.row);
  }

  ngOnInit() {
  }

  onFocusInput(){
    this.focus = true;
    // console.log("focus");
    // console.log("row :"+ this.rowidx+" : " + " col "+this.colidx);
  }
  removeRow(){
    this.focus = false;
    console.log("remove");
    this.addChangesToTable.emit({row:"",rowidx: this.rowidx, colidx:this.colidx});
  }
  addRow(){
    this.focus = false;
    console.log("add");
      this.addChangesToTable.emit({row:this.row,rowidx: this.rowidx, colidx:this.colidx});
  }
  showButtonsOnFocus(){
    if(this.focus){
      return {'display': 'flex'};
    }

    return {'display': 'none'};
  }

}
