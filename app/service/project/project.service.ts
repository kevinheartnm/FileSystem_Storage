import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse, HttpHeaders, HttpRequest, HttpEvent} from '@angular/common/http';
import { ProjecthandlerService } from  './handler/projecthandler.service';
import { Project } from  '../../../models/project';
import { Data } from  '../../../models/data';
import { Resource } from  '../../../models/resources';
import { ProjectData } from  '../../../models/projectdata';
import { Observable, Subject  } from 'rxjs';

const httpOptions ={
  headers : new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

// {observe: 'response'}
@Injectable({
  providedIn: 'root'
})

export class ProjectService {

  // resourceCode: string = "";
  // resourceName: string = "";
  url: string = "http://localhost:8080/project1-server/project";
  // /project/projects
  // /project/{projectName}
  projects: string = "/projects";
  saveFile: string = "/save_file"; // /project/save_file
  addColumn: string = "/add_column"; // /project/add_column/{columnName}
  logoutPath: string = "/delete_column"; // /project/delete_column/{columnName}

  page: number=0;
  maxROW: number = 9;
  maxPagination: number = 0;
  // currentpage: number = 0;
  currentProject: Project = new Project(1, "project1");
  allProjects: Project[] = [];
  reArrangeRow: string[][] = [];
  private projectTableInfo = new Subject<any>();
  // empty: string= "";
  columnName: string[]= [
    "Resource Name",
    "Resource Code",
  ];
  getServerProjectTable: string[][]=[
    // ["cheese", "hotdog",  "egg",  "bread",  "bed",    "car",  "sleep", "popato", "knife", "killer", "jail", "want.", "mom" ],
    // ["001000", "001001","001002", "001030","012030","020405","024056","042304","040130","048090", "040010","040001","010230"],
  ];
  constructor(
    private http: HttpClient,
    private handler: ProjecthandlerService
   ) {}

   //GETS THE FILES --- "url/project/save_file", file
   insertFormFile(file:File):Observable<HttpEvent<{}>>{
     const formdata: FormData = new FormData();
     formdata.append('file', file);
     const req = new HttpRequest('POST', `${this.url}${this.saveFile}`, formdata, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(req);
     // return this.http.post<ProjectData>(`${this.url}${this.saveFile}`,  formdata ,httpOptions );
   }
   // GET ALL THE PROJECTS
    getProjects():Observable<Project[]>{
      return this.http.get<Project[]>(`${this.url}${this.projects}`);
    }
    //PROJECT CLICK ON IN THE DROPDOWN
    setCurrentProject(project: Project):void{
      this.currentProject = project;
    }
    // THE CURRENT PROJECT STORED IN SERVICE
    getCurrentProject():Project{
      return this.currentProject;
    }
    //STORE PROJECTS FROM SERVER
    storeAllProjects(project: Project []): Project []{
      this.allProjects = project;
      // slice method does not affect original array
      return    this.allProjects;
    }
    // ALL THE PROJECT FROM THE SERVER
    getProjectsFromService(){
      return this.allProjects;
    }





    // ALL PROJECT IN ARRAY FORMAT
    getProjectFromBackEnd(){
      // http request from this backend to get infrom
      return this.getServerProjectTable;
    }

    // get the project in the observable method.
    /*
      data: []
      project: Project
      resource: []
    */
    storeProjectFromBackEnd(observableResource:{data:Data[], project:Project, resource: Resource[] }):{columns: string[], rows: string[][]}{
      let restructorDataFromServer: string[][] =[];
      let columnsFromDataTable:string [] =[];
      this.columnName= [
        "Resource Name",
        "Resource Code",
      ];
      // let tempRow: string [] = [];
            // console.log(observableResource);

     this.handler.getFirstTwoMainRows( observableResource.resource , restructorDataFromServer);
     // console.log(restructorDataFromServer);
     this.handler.getColumnsFromServer(observableResource.data,columnsFromDataTable);
     this.handler.getRowsFromServerData(observableResource.data,
        restructorDataFromServer ,
         columnsFromDataTable);
     this.columnName = [...this.columnName, ...columnsFromDataTable ];
     this.getServerProjectTable = restructorDataFromServer;
     // console.log(this.columnName);
     // console.log(this.getServerProjectTable );
     this.getTableMatrix(this.getServerProjectTable);

      // this.getPaginated();
      return {columns:this.columnName , rows: this.reArrangeRow};
    }

    getProjectsData():Observable<{data:Data[], project:Project, resource: Resource[] }>{
      return this.http.get<{data:Data[], project:Project, resource: Resource[] }>(`${this.url}/${this.currentProject.projectName}`);
    }
















    //PAGE NUMBER NEED TO BE SEND HERE
    getPageNumber(page: number):void{
      //0 --0-9, 1 -- 10-19, 2 -- 20-29
      this.page = page;
      // I HAVE NO IDEA WHAT I DID HERE
      this.getPaginated();
    }



  // GET A SMALL PORTION OF THE ARRAY SEND TO USER
    getPaginatedRows(page){
      return this.reArrangeRow.slice(page*this.maxROW, (page+1)*this.maxROW );
    }
      //REARANGE THE ORIGINAL TABLE
    reArrangeTableMatix(newTable: string[][]){
      this.reArrangeRow = this.handler
                          .reArrangeTableRowData(
                            newTable,
                            this.getMaxRowLength(newTable),
                            this.getColumnLength()
                          );
      this.updateMaxPage(this.reArrangeRow);
      //SENDS TO PROJECT
      this.getPaginated();
    }
    //UPDATE MAXIMUM LENGTH
    updateMaxPage(reArrangeRow: string[][]){
      this.maxPagination = Math.ceil(reArrangeRow.length/this.maxROW) -1;
      return this.maxPagination;
    }

      /*STORE THE ORIGINAL TABLE
        REARANGE THE ORIGINAL TABLE FOR THE USER TO SEE*/
    getTableMatrix(projectTable: string[][]){
      this.getServerProjectTable=projectTable;
      this.reArrangeTableMatix(this.getServerProjectTable);
    }

    // GET THE MAXIMUM ROW LENGTH
    getMaxRowLength(oddMatrix: string[][]){
      return this.handler.findMaxRowLength(oddMatrix);
    }
    // GET THE LENGTH OF THE COLUMN
    getColumnLength(){
      return this.columnName.length;
    }


     // ADD ROW TO TABLE
    addRowToTable():Observable<any>{
      this.handler.insertRow(this.getServerProjectTable,this.getColumnLength());
      this.reArrangeTableMatix(this.getServerProjectTable);
      this.getPageNumber(this.maxPagination);
      return this.projectTableInfo.asObservable();
    }
    //ADD COLUMN TO TABLE
    addColumnToTable(newColumn:string):Observable<any>{
      // ADD TO COLUMN
      this.columnName.push(newColumn);
      // ADD COLUMN ROWS
      this.handler.addColumn(this.getServerProjectTable);
      this.reArrangeTableMatix(this.getServerProjectTable);
      return this.getPaginated();
      // return this.projectTableInfo.asObservable();
    }

    //SEARCH METHOD BUTTON BELLOW
    searchResourceCode(search: string): void{
        this.restructorToOriginal();
      if(search){
        const MAXLENGTH:number = 6;
        const  search_length:number = search.length;
        const storage = {};
        //GET RESOURCE INFORMATION AT ROW 2
        const search_result = this.getServerProjectTable[1]
                                .map((elem, idx) =>{
                                  if(elem.slice(MAXLENGTH-search_length ,MAXLENGTH) === search){
                                    // console.log(idx);
                                    storage[elem]=idx;
                                  return idx;
                                }
                              }).filter(elem=> elem !== undefined);
        //Turn the object into array
        let sorting_object: any[] = Object.keys( storage );
        const sorted_index = sorting_object
        // sort object base on resource code
        .sort((a,b)=> a-b)
        // get all index in order
        .map(order=> storage[order] );
        console.log(sorted_index);
        // create new table base on the integer
        this.reArrangeRow= this.updateUserTable(sorted_index);
        this.updateMaxPage(this.reArrangeRow);
          // create new table base on the integer
         this.getPaginated();
      }
    }
    updateUserTable(tableSearchIndex: number []):string [][]{
      let createTable: string[][]= [];
      let single_row:any []= [];
      // get table by index
      for(let index of tableSearchIndex){
        // single_row;
        for(let i = 0; i< this.reArrangeRow.length; i++){
          if(i === index){
            single_row.push(this.reArrangeRow[index]);
          }
        }
        //Push into main array
        createTable.push(...single_row);
        single_row = [];
      }
      return createTable;
    }
    //GETS THE ORIGINAL DATA FROM THE SERVER
    restructorToOriginal(){
      this.reArrangeTableMatix(this.getServerProjectTable);
      this.getPaginated();
    }


    // USE SUBJECT TO UPDATA TABLE FOR THE USER
    getPaginated():Observable<any>{
      this.projectTableInfo.next({
        reArrangeRow:this.getPaginatedRows(this.page),
         columnName:this.columnName,
          currentpage: this.page,
          maxPagination: this.maxPagination +1
        });
      return this.projectTableInfo.asObservable();
    }

}
