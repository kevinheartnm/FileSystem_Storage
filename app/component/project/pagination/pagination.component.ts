import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { ProjectService } from '../../../service/project/project.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
/**
MAX i want to hold is 7 each row
*/
export class PaginationComponent implements OnInit, OnDestroy, OnChanges {
  currentpage:number;

  pageAmount: number = 0;
  isActive: boolean = false;
  subscription: Subscription;

  constructor(private projectService:ProjectService) {
    // start at this page
    this.currentpage = 0;
  }
  ngOnChanges(){
  //   this.subscription = this.projectService
  //                           .getPaginated()
  //                           .subscribe(res=>{
  //                             this.currentpage = res.currentpage;
  //                             this.pageAmount = res.maxPagination;
  //                             // console.log(res);
  //                           })
  }


  ngOnInit() {
    this.projectService.getPageNumber(this.currentpage);
    this.subscription = this.projectService
                            .getPaginated()
                            .subscribe(res=>{
                              this.currentpage = res.currentpage;
                              this.pageAmount = res.maxPagination;
                              // console.log(res);
                            })
    // this.pageAmount =   this.projectService.updateMaxPage();
  }

  onPageClick(page){
    this.currentpage = page ;
    this.projectService.getPageNumber(this.currentpage);
  }

  currentlyActive(idx){
    if(this.currentpage === idx)
      return {"active": true };
    return {"active": false };
  }

  nextPage(){
    if(this.pageAmount - 1 >this.currentpage)
      this.currentpage++;
    this.projectService.getPageNumber(this.currentpage);
  }
  previousPage(){
    if(this.currentpage > 0)
      this.currentpage--;
    this.projectService.getPageNumber(this.currentpage);
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
