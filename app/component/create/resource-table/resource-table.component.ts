import { Component, OnInit } from '@angular/core';
import { Resource } from  '../../../../models/resources';
import { CreateService } from '../../../service/create/create.service'

@Component({
  selector: 'app-resource-table',
  templateUrl: './resource-table.component.html',
  styleUrls: ['./resource-table.component.scss']
})
export class ResourceTableComponent implements OnInit {
  resourceInfo: {resource:Resource, checked:boolean}[] ;
  constructor( private createService:CreateService) {}

  ngOnInit() {
    // storing information in local container
    // this.resourceInfo = this.createService.getResourcesFromServer();
    // this.projectInfo = this.createService.getProjectCatalog();
    this.createService.sendInfoToProject().subscribe(
      res =>{
        console.log(res);
        this.resourceInfo = res.sendResourceCatalog;
      }
    );
  }


  updateListWithCheck(row){
    // console.log(event);
    // let this.resourceInfo =
     this.resourceInfo.forEach( resourceInfo =>{
      if(resourceInfo.resource.resourceName === row.resource.resourceName
         && resourceInfo.resource.resourceCode === row.resource.resourceCode){
        resourceInfo.checked = row.checked;
      }
    });
    // console.log(this.resourceInfo);
  }

  checkAllBoxes(checked){
    this.resourceInfo.forEach( row=>row.checked = checked);
    // console.log(this.resourceInfo);
  }

  shareAllCheck(){
    // console.log("share");
    this.createService.addCheckFromResourceToProject(this.resourceInfo);
  }
}
