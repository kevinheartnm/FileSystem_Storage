import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss']
})
export class ShareComponent implements OnInit {
  @Output() shareAllCheck: EventEmitter<void>= new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  /*
    shareBtn()
    sends the items that are check
     to the next side that dont have
      the same name
  */
    shareBtn(){
      // console.log("share button ");
      this.shareAllCheck.emit();
    }

}
