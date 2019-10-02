import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-bin',
  templateUrl: './bin.component.html',
  styleUrls: ['./bin.component.scss']
})
export class BinComponent implements OnInit {
  @Output() removeAllChek: EventEmitter<boolean> = new EventEmitter();
  constructor() { }

  ngOnInit() {}

  /*
      Remove all items from this list
      removeItems(){}
      //this will be use as a trigger to empty
      the array list
  */

  removeItems(){
    console.log(" remove all the items from the project table");
    this.removeAllChek.emit(true);
  }

}
