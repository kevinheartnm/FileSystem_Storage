import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../../service/project/project.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {
  resourceCode:string;
  constructor(private projectService: ProjectService) { }

  ngOnInit() {}

  clickOnSearch(){
    // console.log(" keyword input :"+ this.resourceCode);
    // console.log(this.projectService.getProjectFromBackEnd());
    // if(this.resourceCode)
      this.projectService.searchResourceCode(this.resourceCode);
  }
    // else{
      // this.projectService.restructorToOriginal();
    // }
}
