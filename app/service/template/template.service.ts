import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Project } from  '../../../models/project';
import { Data } from  '../../../models/data';
import { ProjectData } from  '../../../models/projectdata';
import { Formula } from  '../../../models/formula';
import { TemplatehandlerService } from  './template/templatehandler.service';
import { Observable, Subject  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

/*
The information here should be updated on two occations
1. when something change the dropdown fields
2. when you submit on template page
3. if no one update project us the first one as default
*/
export class TemplateService {
  dummyData: Formula[] = [

    new Formula(new Project(1, "nick"),"010100", "name", "firestick", "text", 0 ),
    new Formula(new Project(1, "nick"),"010101", "name", "cartRoller", "text", 0 ),
    new Formula(new Project(1, "nick"),"010104", "name", "phone", "text", 0 ),
    new Formula(new Project(1, "nick"),"010105", "name", "ticket", "text", 0 ),
    new Formula(new Project(1, "nick"),"010106", "name", "firestick", "text", 0 ),
    new Formula(new Project(1, "nick"),"010106", "name", "cartRoller", "text", 0 ),
    new Formula(new Project(1, "nick"),"010108", "name", "phone", "text", 0 ),
    new Formula(new Project(1, "nick"),"010120", "name", "ticket", "text", 0 ),
    //
    new Formula(new Project(1, "nick"),"010140", "name", "firestick", "text", 0 ),
    new Formula(new Project(1, "nick"),"010206", "name", "cartRoller", "text", 0 ),
    new Formula(new Project(1, "nick"),"010308", "name", "phone", "text", 0 ),
    new Formula(new Project(1, "nick"),"010420", "name", "ticket", "text", 0 ),

    new Formula(new Project(1, "nick"),"010100", "cost_code", "7985", "number", 0 ),
    new Formula(new Project(1, "nick"),"010101", "cost_code", "8723", "number", 0 ),
    new Formula(new Project(1, "nick"),"010104", "cost_code", "8724", "number", 0 ),
    new Formula(new Project(1, "nick"),"010105", "cost_code", "8725", "number", 0 ),
    new Formula(new Project(1, "nick"),"010100", "cost_code", "8825", "number", 0 ),
    new Formula(new Project(1, "nick"),"010101", "cost_code", "8875", "number", 0 ),
    new Formula(new Project(1, "nick"),"010104", "cost_code", "8895", "number", 0 ),
    new Formula(new Project(1, "nick"),"010105", "cost_code", "8975", "number", 0 ),
  ];



 url:string = "http://localhost:8080/project1-server/formula";
   // /formula/{projectName}"
  // /formula/create_new_formula_page
 createNewFormula:string ="/create_new_formula_page"
  serviceDataSet: Set<string>= new Set();
  serviceDataProjectScope: string []= [ ];
  serviceDataQuantitySurvey: {field:string, type:string,formula:string } []= [];
  // contains fomula name and formula
  formulaData: any = {};

  FormulaPageColumns: string[]= [];
  FormulaTypes: string[] = [];
  FormulaTableROWS: string[][]= [];
  FormulaTableROWSPresented: string[][];
  private templateTableInfo = new Subject<any>();

  //PAGINATION
  maxROW: number= 10;
  currentpage: number=0;
  maxPagination: number=0;
  // <{field:string, type:string,formula:string }>
  constructor(
    private http: HttpClient,
    private templatehandler: TemplatehandlerService
  ) { }
  // SAVE UPDATED INFORMATION
    createNewFormulaData(){
            return this.http.put<Formula[]>(`${this.url}${this.createNewFormula}`, this.dummyData);
    }
  // going to back-end to get information about
  getFormulaPageDataByProjectName(project: Project):Observable<Formula[]>{
          return this.http.get<Formula[]>(`${this.url}/${project.projectName}`);
  }
  // SWAP METHOD WITH THE ABOVE
  reprecentFormulaPageDat(){
    return this.dummyData;
  }
  // need to store it after subscribing to the user
  storeProjectScopeField(serverDatas: Formula []){
    //CLEAR CONTAINERS BEFORE ADDING ANYTHING
    this.serviceDataProjectScope = [];
    this.serviceDataSet.clear();
    // collect the one that are not in the list
    for(let serverData of serverDatas){
      if(!serverData["fromResource"]){
        if(!this.serviceDataSet.has(serverData["columnName"]))
        this.serviceDataProjectScope.push(serverData["columnName"]);
        // for finding out if we alread have one
        this.serviceDataSet.add(serverData["columnName"]);
      }
    }
    // this.serviceDataProjectScope;
    // this.serviceDataProjectScope = serviceDataProjectScope;
  }
// get all quantity field
  storeQuantitySurveyField(serverDatas: Formula []){
    //CLEAR CONTAINERS BEFORE ADDING ANYTHING
    this.serviceDataQuantitySurvey= [];
    this.serviceDataSet.clear();
    // collect the one that are not in the list
    for(let serverData of serverDatas){
      if(serverData["fromResource"]){
        if(!this.serviceDataSet.has(serverData["columnName"])){
            // console.log(serverData);
          this.serviceDataQuantitySurvey.push({
            field: serverData["columnName"],
             type: serverData["type"],
             formula: serverData["value"]
         });
         // for finding out if we alread have one
         this.serviceDataSet.add(serverData["columnName"]);
        }
      }
    }
  }
  storeServiceData(serverDatas: Formula []){
    this.storeProjectScopeField(serverDatas);
    this.storeQuantitySurveyField(serverDatas);
  }
  getProjectScopeFields(){
    return this.serviceDataProjectScope;
  }
  getQuantitySurveyFields(){
    return this.serviceDataQuantitySurvey;
  }



  getColumnsFromTemplate(): string[]{
    return this.FormulaPageColumns;
  }
  getTypesFromTemplate(): string[]{
    return this.FormulaTypes;
  }
// this.FormulaTableROWSPresented

// this.templatehandler.reArrangeTableRowData(this.FormulaTableROWS,
//                                             this.templatehandler.findMaxRowLength,
//                                             this.FormulaTableROWS.length
//                                            );








  //GET SUBMITTED INFORMATION
    getSubmitInfor(projects: Set<string>,
      quantitys:{field:string, type:string,formula:string }[])
      :void {
        // console.log(quantitys);
      // Field are valid here
        let tableInfor:{columns: string[], rows: string[][], types:string[]} ;
        let validate:{message:string, valid:boolean} =  this.templatehandler.validationForTemplate( quantitys, this.serviceDataProjectScope);
        console.log(validate.message);
        if(validate.valid){
          // GET THE FORMULA INTO A MAPFORMAT
          this.formulaData= this.templatehandler.getFormulaIntoMap(quantitys);

          if (Object.keys(this.formulaData).length){
            let validateFormula =  this.templatehandler.validateFormulate(this.formulaData, quantitys)
              // );
              // console.log(validateFormula);
            if(!validateFormula.valid) return ;
          }
          // GET FIELD THAT HAS DEFAULT FIX TO CHECK
          const formulaNameDatas = this.dummyData.filter(fomuladata=>fomuladata.columnName ===  "name");



          // MAPPING TO THE RESOURCE CODE OF THE ORIGINAL DATA
          this.templatehandler.updateFormulaData(
            this.dummyData,
            formulaNameDatas,
            quantitys
          );
          // GET COLUMNS AND ROWS
          tableInfor= this.templatehandler.convertFromFormulaToMatrix(
            this.dummyData,
            projects,
            quantitys
          );
          // console.log(tableInfor);
          // GET DATA FOR MAIN FORMULA PAGE
          this.FormulaPageColumns = tableInfor.columns;
          this.FormulaTableROWS = tableInfor.rows;
          this.FormulaTypes = tableInfor.types;
            // console.log(this.FormulaPageColumns);
            // console.log(this.FormulaTableROWS );
        }
    }

    // RESTRUCTOR THE DATA THAT WAS CREATED WITH THE TEMPLATE PAGE
      restructorTableToPrecent(): string[][]{
        // this.FormulaTableROWS - Updated after the user submits his infromation
        if(this.FormulaTableROWS){
          //FormulaTableROWSPresented -- formate the correct columns and rows to the user
          this.FormulaTableROWSPresented = this.templatehandler.reArrangeTableRowData(
                                                      this.FormulaTableROWS,
                                                      this.templatehandler.findMaxRowLength(this.FormulaTableROWS),
                                                      this.FormulaTableROWS.length
                                                 );
          this.updateMaxPage(this.FormulaTableROWSPresented);
           return this.FormulaTableROWSPresented.slice(this.currentpage*this.maxROW, (this.currentpage+1)*this.maxROW );
        }else{
          return [];
        }
      }



    //  PAGINATION
    getPageNumber(currentpage: number):void{
      //0 --0-9, 1 -- 10-19, 2 -- 20-29
      this.currentpage = currentpage;
      // I HAVE NO IDEA WHAT I DID HERE
      this.getPaginated();
    }
    //
    getPaginatedRows(){
      // if(this.FormulaTableROWSPresented)
        return this.FormulaTableROWSPresented.slice(this.currentpage*this.maxROW, (this.currentpage+1)*this.maxROW );
      // else
      //   return [];
    }
    // getFormulaRowsPresented(){
    //   return this.getPaginatedRows(this.currentpage);
    // }

    //UPDATE MAXIMUM LENGTH
    updateMaxPage(reArrangeRow: string[][]){
      this.maxPagination = Math.ceil(reArrangeRow.length/this.maxROW) -1;
      return this.maxPagination;
    }

    getPaginated():Observable<any>{
      this.templateTableInfo.next({
        FormulaTableROWSPresented:this.getPaginatedRows(),
         columnName:this.FormulaPageColumns,
         types: this.FormulaTypes,
          currentpage: this.currentpage,
          maxPagination: this.maxPagination +1,
          formulaData: this.formulaData
        });
      return this.templateTableInfo.asObservable();
    }


// i need to update the hole table
    updateTable(precemtedTable: string[][]){
      // let x :number = 0;
      // i is the current position of the previous table
      // for(let i = this.currentpage*this.maxROW; i<(this.currentpage+1)*this.maxROW ; i++ ){
      //   this.FormulaTableROWSPresented[i] = precemtedTable[(this.currentpage+1)*this.maxROW - ((this.currentpage+1)*this.maxROW - x)];
      //   x++
      // }

      this.getPaginated();
    }


    updateTableFromCreatePage( data :{columnNames:string[], types:string[], tableRows:string[][]}){

      // FormulaTableROWSPresented
      this.FormulaTableROWS = data.tableRows;
      this.FormulaPageColumns = data.columnNames;
      this.FormulaTypes = data.types;
      // has the code of the user
      // this.FormulaTableROWS[1]
      //REPRECENT DUMMY DATA
      this.dummyData = this.makeDummyData(this.FormulaPageColumns, this.FormulaTypes, this.FormulaTableROWS);
      // this.FormulaPageColumns.forEeach
      // new Formula(new Project(0, "default"),"010100", this.FormulaPageColumns[0], FormulaTableROWS[0][0...90], "text", 0 );
      // new Formula(new Project(0, "default"),"010100", this.FormulaPageColumns[1], FormulaTableROWS[1][0...90], "text", 0 );
      //
      // FormulaTableROWS[1][0...90]





      this.FormulaTableROWSPresented = this.templatehandler.reArrangeTableRowData(
                                                  this.FormulaTableROWS,
                                                  this.templatehandler.findMaxRowLength(this.FormulaTableROWS),
                                                  this.FormulaTableROWS.length
                                             );
      this.updateMaxPage(this.FormulaTableROWSPresented);
      this.getPaginated();
       // return this.FormulaTableROWSPresented.slice(this.currentpage*this.maxROW, (this.currentpage+1)*this.maxROW );
    }


    makeDummyData(columnNames:string[], types:string[], tableRows:string[][]): Formula[]{
      console.log("make dummydata")
      let dummyData: Formula[] = [];
        //
        // tableRows[1].forEach( (code, idx )=>{
        //   code
        // });
        //   dummyData.push(  new Formula(new Project(0, "default"), cell, columnNames[idx], cell, "text", 0 ) );
        //

        tableRows.forEach( (rows, idx) => {
            // columnNames[idx]
            rows.forEach( (cell, rowidx)=>{
              // if(columnNames[idx] === "cost_code" )
              // dummyData.push(  new Formula(new Project(0, "default"), cell, columnNames[idx], cell, "text", 0 ) );
              // else{
                dummyData.push(  new Formula(new Project(0, "default"), tableRows[1][rowidx], columnNames[idx], cell, "text", 0 ) );
              // }
            });
            // new Formula(new Project(0, "default"),"010100", columnNames[idx], FormulaTableROWS[0][0...90], "text", 0 )

        });
        // console.log(dummyData);


        // new Formula(new Project(0, "default"),"010100", this.FormulaPageColumns[0], FormulaTableROWS[0][0...90], "text", 0 )
      return dummyData;
    }
}
