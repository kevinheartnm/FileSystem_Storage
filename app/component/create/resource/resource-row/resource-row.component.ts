import { Component, OnInit, Input , Output, EventEmitter} from '@angular/core';
import {Resource} from '../../../../../models/resources';
@Component({
  selector: 'app-resource-row',
  templateUrl: './resource-row.component.html',
  styleUrls: ['./resource-row.component.scss']
})
export class ResourceRowComponent implements OnInit {
  @Input() resourceCol;
  @Output() changeCheckBox:
   EventEmitter<{resource:Resource ,checked:boolean}>
   = new EventEmitter();
     // checked: boolean = false;
  constructor() { }

  ngOnInit() { }
  onCheckBoxClick(event){
    // console.log("resource row checked")
      // console.log(event.target.checked);
      this.resourceCol.checked = event.target.checked;
      // console.log(this.resourceCol);

      this.changeCheckBox.emit(this.resourceCol);
  }


}
