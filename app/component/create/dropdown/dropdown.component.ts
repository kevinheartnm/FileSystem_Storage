import { Component, OnInit } from '@angular/core';
import { Project } from '../../../../models/project';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {
  projects: Project[];
  constructor() {
    this.projects = [
      {id:1, projectName: "Project 1"},
      {id:2, projectName: "Project 2"},
      {id:3, projectName: "Project 3"},
      {id:4, projectName: "Project 4"},
      {id:5, projectName: "Project 5"},
      {id:6, projectName: "Project 6"},
      {id:7, projectName: "Project 7"},
  ]
  // console.log(this.projects);
  }

  ngOnInit() {
  }
  clickOnProject(event){
    console.log(event);
  }
}


/*

dummy data test
this.projects = [
  {_id:1, projectName: "Project 1"},
  {_id:2, projectName: "Project 2"},
  {_id:3, projectName: "Project 3"},
  {_id:4, projectName: "Project 4"},
  {_id:5, projectName: "Project 5"},
  {_id:6, projectName: "Project 6"},
  {_id:7, projectName: "Project 7"},
]

*/
