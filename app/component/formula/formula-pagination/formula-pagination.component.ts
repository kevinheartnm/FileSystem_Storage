import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
// import { ProjectService } from '../../../service/project/project.service';
import { TemplateService } from '../../../service/template/template.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-formula-pagination',
  templateUrl: './formula-pagination.component.html',
  styleUrls: ['./formula-pagination.component.scss']
})
export class FormulaPaginationComponent implements OnInit, OnDestroy, OnChanges {
  subscription: Subscription;
  currentpage:number;
  pageAmount: number = 0;
  isActive: boolean = false;
  // subscription: Subscription;
          constructor(
                private templateService: TemplateService
          ) { }
          ngOnChanges(){}
          ngOnInit() {
            this.currentpage = 0;
            this.templateService.getPageNumber(this.currentpage);
            this.subscription = this.templateService
                                    .getPaginated()
                                    .subscribe(res=>{
                                      this.currentpage = res.currentpage;
                                      this.pageAmount = res.maxPagination;
                                      console.log(res);
                                    })
            // this.pageAmount =   this.projectService.updateMaxPage();
          }

        onPageClick(page){
          this.currentpage = page ;
          this.templateService.getPageNumber(this.currentpage);
        }

        currentlyActive(idx){
          if(this.currentpage === idx)
            return {"active": true };
          return {"active": false };
        }

        nextPage(){
          if(this.pageAmount - 1 >this.currentpage)
            this.currentpage++;
          this.templateService.getPageNumber(this.currentpage);
        }
        previousPage(){
          if(this.currentpage > 0)
            this.currentpage--;
          this.templateService.getPageNumber(this.currentpage);
        }
        ngOnDestroy(){
        this.subscription.unsubscribe();
    }

}
