import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-project-rows',
  templateUrl: './project-rows.component.html',
  styleUrls: ['./project-rows.component.scss']
})
export class ProjectRowsComponent implements OnInit {
  @Input() data;
  @Input() even;
  @Output() addField: EventEmitter <{name:string, checkmark:boolean}> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  // event from each check from the user
  onCheckBoxChange(event){
    // console.log(this.data + " : " +event.target.checked);
    this.addField.emit({name: this.data , checkmark:event.target.checked});
  }

  //I DONT KNOW WHY , even and odds seem to be switch
  evenRowColor(){
    // console.log(this.even + " : " + this.data);
    if(this.even)
      return {'odd': this.even}
    return {'even': !this.even}
  }

}
