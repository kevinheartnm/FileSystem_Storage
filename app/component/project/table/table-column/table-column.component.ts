import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table-column',
  templateUrl: './table-column.component.html',
  styleUrls: ['./table-column.component.scss']
})
export class TableColumnComponent implements OnInit {
  @Input() tableRows: string[];
  @Input() rowidx: number;
  @Output() updateTable: EventEmitter<{row:string,rowidx:number,colidx:number}> = new EventEmitter();
  constructor() {}
  ngOnInit() {}
  addChangesToTable(event){
    // console.log(event);
    this.updateTable.emit(event);
  }
}
