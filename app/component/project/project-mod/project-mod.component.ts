import { Component, OnInit, Input } from '@angular/core';
import { ProjectService } from '../../../service/project/project.service';
import { Project }  from '../../../../models/project';
@Component({
  selector: 'app-project-mod',
  templateUrl: './project-mod.component.html',
  styleUrls: ['./project-mod.component.scss']
})
export class ProjectModComponent implements OnInit {
  projects: Project [];
  @Input() tableRows;
  constructor(private projectService: ProjectService) { }

  ngOnInit() {}

  onSubmitProject(){
    console.log("submit project page");
    // this.projects = this.projectService.getProjectsFromService();
    console.log(this.tableRows);
  }
}
