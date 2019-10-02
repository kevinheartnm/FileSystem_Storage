import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';

@Component({
  selector: 'app-formula-column',
  templateUrl: './formula-column.component.html',
  styleUrls: ['./formula-column.component.scss']
})
export class FormulaColumnComponent implements OnInit {
  @Input() tableRows: string[];
  @Input() rowidx: number;
  @Input() types: string[];
  @Input() formulas: any;
  @Input() columnName: string[];
  @Output() updateTable: EventEmitter<{row:string,rowidx:number,colidx:number}> = new EventEmitter();
  constructor() {}
  ngOnInit() {}
  addChangesToTable(event){
    this.updateTable.emit(event);
  }

}
