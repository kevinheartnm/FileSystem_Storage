import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProjecthandlerService } from '../../../service/project/handler/projecthandler.service';
// import { HandlerService } from '../../../service/handler/handler.service';
import { ProjectService } from '../../../service/project/project.service';
import { Subscription } from 'rxjs';
import {Router} from '@angular/router';
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {
  showPopup: boolean = false;
  newColumn: string;
  subscription: Subscription;

  columnName: string[];
  // = [
  //   "Resource Name",
  //   "Resource Code",
  // ];
  // SHOW TO USER
  rowColValues: string[][];
  //
  getFromServer: string[][];

  constructor(
    private handler: ProjecthandlerService,
    private projectService: ProjectService,
    private router: Router
  ) { }

// UPDATE TABLE INFORMATION
  ngOnInit() {

    //GET THE ROW ALL ROWS IN ORDER
    this.getFromServer= this.projectService.getProjectFromBackEnd();
    // SEND INFORMATION BACK TO THE SERVICE
    this.projectService.getTableMatrix(this.getFromServer);
    // SEPERATE THE ROWS TO MATCH WIH THE COLUMN OF THE TABLE
    // this.rowColValues = this.projectService.getPaginatedRows();
    this.subscription = this.projectService
                            .getPaginated()
                            .subscribe(res=>{
                              //GET COLUMN NAMES
                              this.columnName= res.columnName;
                              //GET ROW FOR COLUMNS
                              this.rowColValues= res.reArrangeRow;
                              // console.log(res);
                            },
                            err => {
                              if(err instanceof HttpErrorResponse){
                                this.router.navigate(["/login"]);
                              }
                              // this.router.navigate(["/login"]);
                            });



                            // this.subscription = this.projectService.getProjectsData()
                            //                         .subscribe(
                            //
                            //                           res=>{
                            //                           let {columns , rows } = this.projectService.storeProjectFromBackEnd(res);
                            //                           // this.columnName=columns;
                            //                           // this.rowColValues= rows;
                            //
                            //                           },
                            //                           err=>{
                            //                             if(err instanceof HttpErrorResponse){
                            //                                  this.router.navigate(["/login"]);
                            //                             }
                            //                           }
                            //                         )
  }
    //NEED THE ROW AND COLUMB OF TABLES
    getColumnLength(){
      return this.columnName.length;
    }
    getMaxRowLength(oddMatrix: string[][]){
      return this.handler.findMaxRowLength(oddMatrix);
    }


//BELOW ARE ACTION BUTTONS WHICH I USE TO GET RESPONSE FOR THE TABLE
    // ACTIVATES POPUP
    addOneColumn(){
      this.showPopup =true;
    }
    // DE-ACTIVATES POPUP
    onCancelColumn(){
      this.showPopup =false;
    }
    // SUBMIT BUTTON FOR POPUP
    onSumbitColumn(){
        this.showPopup =false;
        this.projectService.addColumnToTable(this.newColumn);
    }


    addOneRow(){
      this.subscription = this.projectService
      .addRowToTable()
      .subscribe(res=>{
        this.rowColValues = res.reArrangeRow;
      });
    }
    updateTable({row, rowidx, colidx}){
      // console.log("add cell " + row);
      this.rowColValues[rowidx][colidx] = row;

      // this.projectService.updateCurrentTable(this.rowColValues);
    }



    ngOnDestroy() {
      // unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
    }
}





/*

DUMMY DATA WORKS
this.columnName = [
  "Resource Name",
  "Resource Code",
  "Cost",
  "Quantity"
];
this.rowColValues = [
  ["cheese", "hotdog","egg", "bread", "tomatoo"],
  ["001000", "001001","001002", "001030", "001400"],
  ["30", "50","20", "30", "14"],
  ["3", "2","2", "4", "5"]
];



*/
