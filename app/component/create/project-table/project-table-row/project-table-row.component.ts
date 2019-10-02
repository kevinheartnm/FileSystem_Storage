import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Resource} from '../../../../../models/resources';
@Component({
  selector: 'app-project-table-row',
  templateUrl: './project-table-row.component.html',
  styleUrls: ['./project-table-row.component.scss']
})
export class ProjectTableRowComponent implements OnInit {
  @Input() projectCol;
  @Output() changeCheckBox:
   EventEmitter<{resource:Resource,checked:boolean}>
   = new EventEmitter();
  constructor() { }

  ngOnInit() {}

  onCheckBoxClick(event){
    // console.log("project click")
      // console.log(event.target.checked);
      this.projectCol.checked = event.target.checked;
      this.changeCheckBox.emit(this.projectCol);
  }

}
