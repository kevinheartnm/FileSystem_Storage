import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-quantity',
  templateUrl: './quantity.component.html',
  styleUrls: ['./quantity.component.scss']
})
export class QuantityComponent implements OnInit {
  @Input() serviceDataQuantity;
  // count: number;
  datas: any[] =  [{field:"", type:'number',formula:"" }] ;
  constructor() { }

  ngOnInit() {
    // console.log(this.serviceDataQuantity);
      this.datas = [...this.serviceDataQuantity, ...this.datas];
      // this.datas.forEach((elem, idx )=> {
      //   console.log(idx);
      // })
  }
  removeIndexOfItem(removeid){
    // console.log("remove " + removeid);
    this.datas=   this.datas.filter((elem, idx)=> idx !== removeid);
    // splice is defected when removing by index
        // this.datas.splice(removeid,removeid+1);
  }


   addQuantity(){
     // this.count++;
     this.datas.push({field:"",type:"number", formula:""});
   }
}
