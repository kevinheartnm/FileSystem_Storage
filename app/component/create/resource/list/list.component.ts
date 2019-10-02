import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Output() checkAllBoxes: EventEmitter<boolean> = new EventEmitter();
  constructor() { }

  ngOnInit() {}


  /*
  //PS. the buttons are radio buttons
    has two function
    That     goes throw the list of information
    removeAllChecks()
    removes all uncheck all checkboxes for the user
    selectAllChecks()
    check all the checkboxk for the user
  */
  removeAllChecks(event){
    console.log("remove all the check mark the table");
    this.checkAllBoxes.emit(false);
  }
  selectAllChecks(event){
    console.log("make everything check in the list ");
    this.checkAllBoxes.emit(true);
  }

}


/*
  checking a check box
 console.log("select all :" +event.target.checked);
 setting the check mark for the checkbox list
 event.target.checked = false;
*/
