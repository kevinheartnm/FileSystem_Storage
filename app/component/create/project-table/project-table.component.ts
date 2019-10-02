import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import {Resource} from '../../../../models/resources';
// import { CreateService } from '../../../service/create/create.service';
// import { Resource } from  '../../../../models/resources';

@Component({
  selector: 'app-project-table',
  templateUrl: './project-table.component.html',
  styleUrls: ['./project-table.component.scss']
})
export class ProjectTableComponent implements OnInit {
  @Output() changeCheckBox:
   EventEmitter<{resource:Resource,checked:boolean}>
   = new EventEmitter();
  @Input() projectInfo: {resource:Resource,checked:boolean}[];
  // {columnName:"plate", resourceCode:"01010"}
  // Add project from resource
  constructor() {}

  ngOnInit() {

  }
  changeCheckBoxRow(project){
    this.changeCheckBox.emit(project);
  }
  // need something to listen to the server,

}
