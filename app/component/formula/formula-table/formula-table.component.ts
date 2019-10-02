import { Component, OnInit, OnDestroy } from '@angular/core';
import { TemplateService } from '../../../service/template/template.service';
import { TemplatehandlerService } from '../../../service/template/template/templatehandler.service';
import { ProjecthandlerService } from '../../../service/project/handler/projecthandler.service';
import { ProjectService } from '../../../service/project/project.service';
import { Project }  from '../../../../models/project';
import { Subscription } from "rxjs"

@Component({
  selector: 'app-formula-table',
  templateUrl: './formula-table.component.html',
  styleUrls: ['./formula-table.component.scss']
})
export class FormulaTableComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  currentProject: Project;

  // reprecentFormulaPageData: string[][];
  columnName: string[];
  types: string[];
  formulas: any;
  // subscription: Subscription;
  reprecentFormulaPageData: string[][];
  getFromServer: string[][];

  constructor(
    private templateService: TemplateService,
    private templatehandler: TemplatehandlerService,
    private handler: ProjecthandlerService,
    private projectService:ProjectService

  ) { }

  //       if(this.currentProject){
  //         this.templateService.getFormulaPageDataByProjectName(this.currentProject).subscribe(res=>{
  //           console.log(res);
  //         });
  //       }
  // }
  ngOnInit() {
    //GET THE ROW ALL ROWS IN ORDER
      // this.getFromServer;

      // GET THE CURRENT PROJECT
      this.currentProject = this.projectService.getCurrentProject();
      // GET THE INFORMATION FROM THE LAST PAGE
      // this.reprecentFormulaPageData = this.templateService.restructorTableToPrecent();
      this.reprecentFormulaPageData = this.templateService.restructorTableToPrecent();
      // this.columnName = this.templateService.getColumnsFromTemplate();
      // this.types = this.templateService.getTypesFromTemplate();
      // this.templateService.getFormulaPageDataByProjectName(this.currentProject).subscribe(res=>{
      //   console.log(res);
      // });
      this.subscription = this.templateService
                              .getPaginated()
                              .subscribe(res=>{
                                //GET COLUMN NAMES
                                this.columnName=res.columnName;
                                this.types=res.types;
                                this.reprecentFormulaPageData=res.FormulaTableROWSPresented;
                                this.formulas = res.formulaData;

                              });

    }

    // getProjects

  //NEED THE ROW AND COLUMB OF TABLES
  getColumnLength(){
    return this.columnName.length;
  }
// update on change
  updateTable({row, rowidx, colidx}){
    this.reprecentFormulaPageData[rowidx][colidx] = row;
  }
  onFormulaSubmit(){
    console.log(this.reprecentFormulaPageData);
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
      this.subscription.unsubscribe();
  }

}
