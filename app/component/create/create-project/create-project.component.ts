import { Component, OnInit } from '@angular/core';
import { CreateService } from '../../../service/create/create.service';
import { Resource } from  '../../../../models/resources';


@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {
  projectInfo: {resource:Resource,checked:boolean}[];
  constructor(private createService:CreateService) { }

  ngOnInit() {
    this.projectInfo = this.createService.getProjectCatalog();
    this.createService.sendInfoToProject().subscribe(
      res =>{
        // console.log(res);
        this.projectInfo = res.sentprojectCatalog;
      }
    );
  }

  removeAllChek(checked){
    //IF IT IS CHECK IT IS REMOVED
    this.createService.updateCheckFromProject(this.projectInfo, checked);
  }
  /*
    Parent of Bin and List
    Service onInit get infromation
    from the service method
    Hold
    @Input array
    @Ouput binEvent


  */
  changeCheckBox(project){

    console.log(project);
  }
}
