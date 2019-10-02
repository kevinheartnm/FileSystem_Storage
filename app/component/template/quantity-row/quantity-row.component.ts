import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-quantity-row',
  templateUrl: './quantity-row.component.html',
  styleUrls: ['./quantity-row.component.scss']
})
export class QuantityRowComponent implements OnInit {
  @Output() removeAtIndex: EventEmitter<number> = new EventEmitter();
  @Input() data;
  @Input() id;
  dataType: [string, string, string] = ["number","text","formula"];
  constructor() { }

  ngOnInit() {
    // console.log(this.data);
  }
  showFormulaText(){
    if(this.data.type !== "formula")
      return {"template__quantity-column--show": true};
    return {"template__quantity-column--show": false};
  }
  // send the parent the new count
  removeItem(){
    // console.log("remove the one at " + this.id);
     this.removeAtIndex.emit(this.id);
  }
}
