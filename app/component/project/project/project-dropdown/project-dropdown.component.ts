import { Component, OnInit, OnDestroy } from '@angular/core';
import { Project } from '../../../../../models/project';
import { HandlerService } from '../../../../service/handler/handler.service';
import { ProjectService } from '../../../../service/project/project.service';
import { CreateService } from '../../../../service/create/create.service';
import { Subscription } from "rxjs"
@Component({
  selector: 'app-project-dropdown',
  templateUrl: './project-dropdown.component.html',
  styleUrls: ['./project-dropdown.component.scss']
})


export class ProjectDropdownComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  projects: Project[];
  currentproject:string;
  searchInput:string;
  constructor(
                private handler :HandlerService,
                private projectService :ProjectService,
                private createService :CreateService
            ) { }

  ngOnInit() {
    this.subscription = this.projectService.getProjects().subscribe(
      res => {
        // console.log(res);
        // putting the projects in the resource
        this.projects = this.projectService.storeAllProjects(res);
          // ADD TEXT TO THE TOP PART OF DROP DOWN
        this.currentproject =this.projects[0].projectName;
          // SET THE CURRENT PROJECT THAT USER IS ON
          this.projectService.setCurrentProject(this.projects[0]);
          //ADD TEXT TO THE HEADER
        this.handler.getProjectInfo(this.projects[0].projectName);
        // console.log(this.projects);
      }
    );
  }
  clickOnProject(project){
    // console.log(event);

    this.currentproject = project.projectName;
    this.handler.getProjectInfo(project.projectName);
    // SET THE CURRENT PROJECT THAT USER IS ON
    this.projectService.setCurrentProject(project);
    this.projectService.getProjectsData().subscribe(
      res=> {
        console.log(res);
        this.projectService.storeProjectFromBackEnd(res);
        // putt the resource in the project field
        this.createService.storeResourceCartalog(res.resource);
        // Update project field
        // this.createService.sendInfoToProject();
        // console.log(res);
      },
      err=> {console.log("There are no projects in this page");}
    )
  }


  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  searchProject(){
        console.log(this.searchInput);
        //LOOKS FOR ITEM THAT MATCHES USER PICK IN THE SERVICE
  }
}
/*

  this.projects = [
    {id:1, projectName: "Project 1"},
    {id:2, projectName: "Project 2"},
    {id:3, projectName: "Project 3"},
    {id:4, projectName: "Project 4"},
    {id:5, projectName: "Project 5"},
    {id:6, projectName: "Project 6"},
    {id:7, projectName: "Project 7"},
]
// console.log(this.projects[0].projectName);
this.currentproject =this.projects[0].projectName;
this.handler.getProjectInfo(this.projects[0].projectName);
*/
