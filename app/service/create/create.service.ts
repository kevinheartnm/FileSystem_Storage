import { Injectable } from '@angular/core';
import { Resource } from  '../../../models/resources';
import {Project} from '../../../models/project';
import {Formula} from '../../../models/formula';
import { Observable, Subject  } from 'rxjs';
import { TemplateService } from  '../template/template.service';

@Injectable({
  providedIn: 'root'
})
export class CreateService {
  TYPE: string = "text";
  RESOURCE_CODE: string = "resourceCode";
  RESOURCE_NAME: string = "resourceName";
  columnName = [this.RESOURCE_NAME,this.RESOURCE_CODE];

  resourceCatalog: Resource[];
  projectCatalog: Resource[];
  resourceWithCheckBox: {resource:Resource, checked:boolean}[]  = [
          {resource :new Resource( new Project(1,"project1"), "01010", "plate" ), checked:false},
          {resource :new Resource(new Project(2,"project2"),"01020","eggs"),checked:false},
          {resource :new Resource(new Project(3,"project3"),"01040","curry"),checked:false},
          {resource :new Resource(new Project(4,"project4"),"01050","goat"),checked:false},
          {resource :new Resource(new Project(5,"project5"),"01060","chicken"),checked:false},
          {resource :new Resource(new Project(6,"project6"),"01070","turkey"),checked:false},
          {resource :new Resource(new Project(6,"project6"),"01080","donuts"),checked:false},
];
projectWithCheckBox: {resource:Resource, checked:boolean}[]  = [];

  private createTableInfo = new Subject<any>();
  constructor(private template: TemplateService) { }


  storeResourceCartalog( resources: Resource[]){
    // this.resourceCatalog = resources;
    let resourceSet: Set<string> = new Set()
     this.resourceWithCheckBox  = resources
     .filter(res =>{
       if(!resourceSet.has(res.resourceCode)){
               resourceSet.add(res.resourceCode);
          return true;
       }
       return false;
     }).map( res => {
      return   {"resource": res
      , "checked": false };
    }) ;
    this.sendInfoToProject();
  }
  // THIS IS WHAT I AM GOING TO TURN IT INTO
  getResourcesFromServer(){
    return this.resourceWithCheckBox;
  }

  addCheckFromResourceToProject( allResources:{resource:Resource, checked:boolean}[]){
if(this.projectWithCheckBox.length === 0)
    this.projectWithCheckBox =   allResources.filter(resCatalog=> resCatalog.checked === true)
                                              .map( resCatalog=>{
                                                    resCatalog.checked = false;
                                                    return {...resCatalog};
                                                  });
else
    // this.projectWithCheckBox =
  this.projectWithCheckBox=  [...this.projectWithCheckBox ,...allResources.filter(resCatalog=> resCatalog.checked === true)
                                  .filter(matchCheclk=>
                                      !this.projectWithCheckBox.some(res=>{
                                        return res.resource.resourceCode === matchCheclk.resource.resourceCode
                                      })
                                  ).map(resCatalog=>{
                                          resCatalog.checked = false;
                                          return {...resCatalog};
                                  })];
  //SORT DATA INTO ORDER
  this.projectWithCheckBox.sort((a, b)=> Number(a.resource.resourceCode) - Number(b.resource.resourceCode));
                                              // .map( resCatalog=>{
                                              //       resCatalog.checked = false;
                                              //       return {...resCatalog};
                                              //     });

      // console.log(this.projectWithCheckBox);
      this.sendInfoToProject();
  }
  // updateCreateFromProject(){
  //   this.resourceWithCheckBox
  // }
  updateCheckFromProject(allProject:{resource:Resource, checked:boolean}[], checked: boolean){
    this.projectWithCheckBox= allProject.filter( projectCatalog =>projectCatalog.checked !== checked);
    this.sendInfoToProject();
  }
  sendToFormulaTable(){
        // send the information to the formula page
        let columnNames:string[] = ["name", "cost_code"];
        let types: string[] = ["text", "text"];
        let tableRows: string[][]= [];
        // this.projectWithCheckBox.sort((a, b)=> Number(a.resource.resourceCode) - Number(b.resource.resourceCode));
        this.columnName.forEach( column =>{
          let tempRow:string[] = [];
          this.projectWithCheckBox.forEach( res=>{
              tempRow.push(res.resource[column]);
          });
          tableRows.push(tempRow);
        });
        console.log(tableRows);
        this.template.updateTableFromCreatePage(
          {columnNames:columnNames, types:types, tableRows:tableRows}
        );
        // {columnNames:string[], types:string[], tableRows:string[][]}
        // ({columnNames:columnNames, types: types, tableRows: tableRows})

        return this.projectWithCheckBox;
  }
  getProjectCatalog(){
    return this.projectWithCheckBox;
  }
  removeAllProjectCatalog(){
    this.projectWithCheckBox = [];
  }

  sendInfoToProject():Observable<any>{
    //ALWAYS LISTENNGIN TO SEE CHANGES ADDING PROJECT
    this.createTableInfo.next({
        sendResourceCatalog: this.resourceWithCheckBox,
        sentprojectCatalog:this.getProjectCatalog(),
      });
    return this.createTableInfo.asObservable();
  }

}
